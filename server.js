const express = require("express");
const IPFS = require("ipfs");
var Formidable = require("formidable");
// var db = require("./mydb.json");
var db = {
  posts: [],
  users: [],
  categories: ["News", "International", "Sports", "Entertainment", "Economics"]
};
var postHashes = [];
const moment = require("moment");
const fs = require("fs");
// const hash = require("object-hash");
const ethereumUri = "http://localhost:8545";
const Web3 = require("web3");
const ForumAppContract = require("./build/contracts/ForumApp.json");
const web3 = new Web3(ethereumUri);
//const provider = new web3.providers.HttpProvider(ethereumUri);
//web3.setProvider(provider);
const app = express();
var contract = null;
var accounts = null;
var ipfs_node = null;
var hashCode = s =>
  s.split("").reduce((a, b) => {
    a = (a << 5) - a + b.charCodeAt(0);
    return a & a;
  }, 0);
var duration = 60;

async function setUp() {
  var coinbase = await web3.eth.getCoinbase();
  console.log(coinbase);
  let balance = await web3.eth.getBalance(coinbase);
  console.log(balance);
  accounts = await web3.eth.getAccounts();
  console.log(accounts);
  let networkId = await web3.eth.net.getId();
  console.log(networkId);
  const deployedNetwork = ForumAppContract.networks[networkId];
  contract = new web3.eth.Contract(
    ForumAppContract.abi,
    deployedNetwork && deployedNetwork.address
  );

  // Setup ipfs node
  ipfs_node = await IPFS.create();

  // Get db from Chain
  //// Getting Post from Chain
  let id = await contract.methods.getPostLength().call();
  var i;
  for (i = 0; i < id; i++) {
    var post = await contract.methods.getPosts(i).call();

    // Get image from ipfs, post on chain only stores 'hash, post in db stores 'image' and 'hash'
    var image;
    if (post.image_hash.length) {
      image = (await ipfs_node.cat(post.image_hash)).toString();
    } else image = null;

    db.posts.unshift({
      id: post.id,
      category: post.category,
      title: post.title,
      content: post.content,
      date: parseInt(post.date),
      user: post.user,
      img: image,
      likes: 0,
      image_hash: post.image_hash
    });
  }
  try {
    if (fs.existsSync("mydb.json")) {
      //file exists
      fs.readFile("mydb.json", "utf8", function readFileCallback(err, data) {
        if (err) {
          console.log(err);
        } else {
          json_db = JSON.parse(data);
          // Compare db from JSON with db from BlockChain
          var newPosts = json_db.posts.filter(p => {
            return moment().diff(moment(p.date), "seconds") < duration;
          });
          newPosts.reverse().forEach(p => db.posts.unshift(p));
        }
      });
    }
  } catch (err) {
    console.error(err);
  }
  //// Getting User from Chain
  id = await contract.methods.getUserLength().call();
  for (i = 0; i < id; i++) {
    var user = await contract.methods.getUsers(i).call();
    db.users.push({
      addr: user.addr,
      name: user.name
    });
  }
  console.log("DB from BlockChain", db.posts.length);
  fs.writeFile("mydb.json", JSON.stringify(db, null, 4), "utf8", function(err) {
    if (err) throw err;
    console.log("AddPost complete");
  });

  id = await contract.methods.getPostHashLength().call();
  for (i = 0; i < id; i++) {
    var h = await contract.methods.getPostHashes(i).call();
    postHashes.unshift({
      post_id: h.id,
      post_hash: h.post_hash
    });
  }
  // console.log("Post Hashes", postHashes[0]);
}

// Check if db from Chain == db from mydb.json
function verifyDB() {
  // Get db from jsonFile
  var json_db;
  try {
    if (fs.existsSync("mydb.json")) {
      //file exists
      fs.readFile("mydb.json", "utf8", function readFileCallback(err, data) {
        if (err) {
          console.log(err);
        } else {
          json_db = JSON.parse(data);
          // Compare db from JSON with db from BlockChain
          var newPosts = json_db.posts.filter(p => {
            return moment().diff(moment(p.date), "seconds") < duration;
          });

          newPosts.forEach(newPost => {
            let verify_hash = String(hashCode(JSON.stringify(newPost)));
            console.log(
              "Verify json newPost",
              postHashes.filter(p => p.post_id === newPost.id)[0].post_hash ===
                verify_hash
            );
          });
        }
      });
    }
  } catch (err) {
    console.error(err);
  }
}

app.use(express.json());

// Backend Address
app.get("/address", (req, res) => {
  res.json(accounts[0]);
});

// Get Duration
app.get("/duration", (req, res) => {
  res.json(duration);
});

// Users METHODS
//Get
app.get("/user/:addr", (req, res) => {
  const user = db.users.filter(user => user.addr === req.params.addr);
  // user = contract ....
  var name = null;
  if (user.length) name = user[0].name;
  res.json(name); // return
});

// Add User
app.post("/users", async (req, res) => {
  const newUser = {
    addr: req.body.addr,
    name: req.body.name
  };
  db.users.unshift(newUser);
  contract.methods
    .addUser(newUser.addr, newUser.name)
    .send({ gas: 1000000, gasPrice: 100000000000, from: accounts[0] });

  fs.writeFile("mydb.json", JSON.stringify(db, null, 4), "utf8", function(err) {
    if (err) throw err;
    console.log("AddUser complete");
  });
  res.json(newUser.name);

  //////////////////// Testing part
  let id = await contract.methods.getUserLength().call();
  console.log(id);
  console.log(await contract.methods.getUsers(id - 1).call());
  //////////////////// Testing part
});

// Posts METHODS
// Get
app.get("/posts", (req, res) => {
  // post = contract ....
  res.json(db.posts);
});

// Post newPosts to Contract
setInterval(() => {
  var checkTime = moment();
  console.log("LENGTH", db.posts.length)
  var newPosts = db.posts.filter(p => {
    var sub = checkTime.diff(moment(p.date), "seconds");
    if (sub < duration) console.log(sub);
    return sub >= duration && sub < duration + 5;
  });
  if (newPosts.length > 0) console.log("NEWPOST", newPosts.length);
  newPosts.forEach(newPost => {
    let l = newPost.likes;
    newPost.likes = 0;
    let verify_hash = String(hashCode(JSON.stringify(newPost)));
    let verify =
      postHashes.filter(p => p.post_id === newPost.id)[0].post_hash ===
      verify_hash;
    console.log("Verify json newPost", verify);
    if (!verify) {
      console.log("post has been changed!");
      db.posts = db.posts.filter(p => p.id !== newPost.id);
      fs.writeFile("mydb.json", JSON.stringify(db, null, 4), "utf8", function(
        err
      ) {
        if (err) throw err;
        console.log("Delete Changed Post");
      });
      return;
    }
    contract.methods
      .addPost(
        newPost.id,
        newPost.category,
        newPost.title,
        newPost.content,
        newPost.user,
        newPost.date,
        newPost.image_hash // post on chain only stores image_hash
      )
      .send({ gas: 1000000, gasPrice: 100000000000, from: accounts[0] });
    newPost.likes = l;
  });
}, 5000);

// Add
app.post("/posts", async (req, res) => {
  var formData = new Formidable.IncomingForm();
  var newPost = await new Promise(function(resolve, reject) {
    formData.parse(req, function(err, fields, files) {
      if (err) {
        reject(err);
        return;
      }
      resolve(fields);
    });
  });
  newPost.date = parseInt(newPost.date);
  newPost.likes = 0;
  if (newPost.img === "null") newPost.img = null;
  // for (var data of req.body) {
  //   console.log("formData", data);
  // }
  // var newPost = {
  //   id: req.body.id,
  //   category: req.body.category,
  //   title: req.body.title,
  //   content: req.body.content,
  //   date: req.body.date,
  //   user: req.body.user,
  //   img: req.body.img // Store image to local db
  // };
  // console.log("Image to add", newPost.img);
  if (newPost.img) {
    console.log("add image to ipfs");
    await ipfs_node.add(newPost.img, async (err, res2) => {
      if (err) {
        console.log(err);
        return;
      }
      console.log("added to IPFS", res2[0].hash);
      newPost.image_hash = res2[0].hash; // local db also stores image_hash

      // Push to db
      db.posts.unshift(newPost);
      fs.writeFile("mydb.json", JSON.stringify(db, null, 4), "utf8", function(
        err
      ) {
        if (err) throw err;
        console.log("AddPost complete");
      });

      // Add PostHash to verify newPost
      let post_hash = String(hashCode(JSON.stringify(newPost)));
      await contract.methods
        .addPostHash(newPost.id, post_hash)
        .send({ gas: 1000000, gasPrice: 1000000, from: accounts[0] });

      postHashes.unshift({ post_id: newPost.id, post_hash: post_hash });
      console.log(postHashes[0]);

      res.json(newPost);
    });
  } else {
    newPost.image_hash = "";
    // Push to db
    db.posts.unshift(newPost);
    fs.writeFile("mydb.json", JSON.stringify(db, null, 4), "utf8", function(
      err
    ) {
      if (err) throw err;
      console.log("AddPost complete");
    });

    // Add PostHash to verify newPost
    let post_hash = String(hashCode(JSON.stringify(newPost)));
    await contract.methods
      .addPostHash(newPost.id, post_hash)
      .send({ gas: 1000000, gasPrice: 1000000, from: accounts[0] });

    postHashes.unshift({ post_id: newPost.id, post_hash: post_hash });
    console.log(postHashes[0]);

    res.json(newPost);
  }

  // //////////////////// Testing part
  // let id = await contract.methods.getPostLength().call();
  // console.log(id);
  // console.log(await contract.methods.getPosts(id - 1).call());
  // //////////////////// Testing part
});

// Delete
app.delete("/posts/:id", (req, res) => {
  db.posts = db.posts.filter(post => post.id !== req.params.id);

  fs.writeFile("mydb.json", JSON.stringify(db, null, 4), "utf8", function(err) {
    if (err) throw err;
    console.log("DeletePost complete");
  });

  res.json(db.posts);
});

// Update Post's Likes
app.put("/posts/:id", (req, res) => {
  var updatePost;
  db.posts.some((p, idx) => {
    if (p.id === req.params.id) {
      db.posts[idx].likes += 1;
      updatePost = db.posts[idx];
      return true;
    } else {
      return false;
    }
  });

  fs.writeFile("mydb.json", JSON.stringify(db, null, 4), "utf8", function(err) {
    if (err) throw err;
    console.log("UpdatePost complete");
  });

  res.json(updatePost);
});

// Categories METHODS
app.get("/categories", (req, res) => {
  res.json(db.categories);
});

app.post("/categories", (req, res) => {
  const newCategory = {
    id: req.body.id,
    name: req.body.name
  };

  db.categories.push(newCategory);
  res.json(newCategory);
});

const port = process.env.PORT || 7000;

app.listen(port, async () => {
  console.log(`Server started on port ${port}`);
  setUp();
});
