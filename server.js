const express = require("express");
var db = require("./mydb.js");
const ethereumUri = "http://localhost:8545";
const Web3 = require("web3");
const TodoAppContract = require("./build/contracts/TodoApp.json");
const web3 = new Web3(ethereumUri);
//const provider = new web3.providers.HttpProvider(ethereumUri);
//web3.setProvider(provider);
const app = express();
var contract = null;
var accounts = null;
async function setUp() {
  var coinbase = await web3.eth.getCoinbase();
  console.log(coinbase);
  let balance = await web3.eth.getBalance(coinbase);
  console.log(balance);
  accounts = await web3.eth.getAccounts();
  console.log(accounts);
  let networkId = await web3.eth.net.getId();
  console.log(networkId);
  const deployedNetwork = TodoAppContract.networks[networkId];
  contract = new web3.eth.Contract(
    TodoAppContract.abi,
    deployedNetwork && deployedNetwork.address
  );
  //console.log(contract)
}
setUp();

app.use(express.json());

// Backend Address
app.get("/address", (req, res) => {
  res.json(accounts[0]);
});

// Users METHODS

app.get("/user/:addr", (req, res) => {
  const user = db.users.filter(user => user.addr === req.params.addr);
  // user = contract ....
  res.json(user); // return
});

// Posts METHODS
// Get
app.get("/posts", (req, res) => {
  // post = contract ....
  res.json(db.posts);
});

// Add
app.post("/posts", async (req, res) => {
  const newPost = {
    id: req.body.id,
    category: req.body.category,
    title: req.body.title,
    content: req.body.content
  };
  contract.methods
    .addPost(newPost.id, newPost.category, newPost.title, newPost.content)
    .send({ gas: 1000000, gasPrice: 100000000000, from: accounts[0] });
  db.posts.unshift(newPost);
  res.json(newPost);

  //////////////////// Testing part
  let id = await contract.methods.getPostLength().call();
  console.log(id);
  console.log(await contract.methods.getPosts(id - 1).call());
  //////////////////// Testing part
});

// Delete
app.delete("/posts/:id", (req, res) => {
  db.posts = db.posts.filter(post => post.id !== req.params.id);
  res.json(db.posts);
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

app.delete("/categories/:id", (req, res) => {
  db.categories = db.categories.filter(
    category => category.id !== req.params.id
  );
  res.json(db.categories);
});

const port = process.env.PORT || 7000;

app.listen(port, async () => {
  console.log(`Server started on port ${port}`);
});
