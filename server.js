const express = require("express");
const IPFS = require("ipfs");

// var db = require("./mydb.json");
var db = {
  posts: [],
  users: [],
  categories: ["News", "International", "Sports", "Entertainment", "Economics"]
};
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

async function setUp() {
  // Getting smart contract
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

  //console.log(contract)

  // Get db from Chain
  // var chain_db = {
  //   posts: [],
  //   users: [],
  //   categories: [
  //     "News",
  //     "International",
  //     "Sports",
  //     "Entertainment",
  //     "Economics"
  //   ]
  // };
  let id = await contract.methods.getPostLength().call();
  console.log(id);
  var i;
  for (i = 0; i < id; i++) {
    var post = await contract.methods.getPosts(i).call();
    db.posts.unshift({
      id: post.id,
      category: post.category,
      title: post.title,
      content: post.content,
      date: parseInt(post.date),
      user: post.user,
      likes: 0,
      img: post.image_hash,
    });
  }
  id = await contract.methods.getUserLength().call();
  for (i = 0; i < id; i++) {
    var user = await contract.methods.getUsers(i).call();
    db.users.push({
      addr: user.addr,
      name: user.name
    });
  }
  console.log("DB from BlockChain", db);

  // Get db from jsonFile
  // var json_db = {
  //   posts: [],
  //   users: [],
  //   categories: [
  //     "News",
  //     "International",
  //     "Sports",
  //     "Entertainment",
  //     "Economics"
  //   ]
  // };
  // try {
  //   if (fs.existsSync("mydb.json")) {
  //     //file exists
  //     fs.readFile("mydb.json", "utf8", function readFileCallback(err, data) {
  //       if (err) {
  //         console.log(err);
  //       } else {
  //         db = JSON.parse(data); //now it an object
  //         // console.log("db", db);
  //         json_db = JSON.parse(data);
  //         // Compare db from JSON with db from BlockChain
  //         json_db.posts = db.posts.filter(p => {
  //           // console.log(moment().diff(moment(p.date), "seconds"));
  //           return moment().diff(moment(p.date), "seconds") > 60;
  //         });
  //         // console.log("From BlockChain", chain_db);
  //         // console.log("From mydb.json", json_db);
  //         // console.log(JSON.stringify(chain_db) === JSON.stringify(json_db));
  //       }
  //     });
  //   }
  // } catch (err) {
  //   console.error(err);
  // }
}

app.use(express.json());

// Backend Address
app.get("/address", (req, res) => {
  res.json(accounts[0]);
});

// Get Duration
app.get("/duration", (req, res) => {
  res.json(60);
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

//Add
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
  var newPosts = db.posts.filter(p => {
    var sub = checkTime.diff(moment(p.date), "seconds");
    if (sub < 60) console.log(sub);
    return sub >= 60 && sub < 65;
  });
  if (newPosts.length > 0) console.log("NEWPOST", newPosts);
  newPosts.forEach(newPost => {
    contract.methods
      .addPost(
        newPost.id,
        newPost.category,
        newPost.title,
        newPost.content,
        newPost.user,
        newPost.date,
        newPost.img
      )
      .send({ gas: 1000000, gasPrice: 100000000000, from: accounts[0] });
  });
}, 5000);

// Add
app.post("/posts", async (req, res) => {
  const newPost = {
    id: req.body.id,
    category: req.body.category,
    title: req.body.title,
    content: req.body.content,
    date: req.body.date,
    user: req.body.user,
    likes: 0,
    img: req.body.img
  };

  // Push to db
  db.posts.unshift(newPost);

  fs.writeFile("mydb.json", JSON.stringify(db, null, 4), "utf8", function(err) {
    if (err) throw err;
    console.log("AddPost complete");
  });

  res.json(newPost);

  //////////////////// Testing part
  let id = await contract.methods.getPostLength().call();
  console.log(id);
  console.log(await contract.methods.getPosts(id - 1).call());
  //////////////////// Testing part
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

// Delete
app.delete("/posts/:id", (req, res) => {
  db.posts = db.posts.filter(post => post.id !== req.params.id);

  fs.writeFile("mydb.json", JSON.stringify(db, null, 4), "utf8", function(err) {
    if (err) throw err;
    console.log("DeletePost complete");
  });

  res.json(db.posts);
});

// Categories METHODS
app.get("/categories", (req, res) => {
  res.json(db.categories);
});

const port = process.env.PORT || 7000;

app.listen(port, async () => {
  console.log(`Server started on port ${port}`);
  setUp();
});
