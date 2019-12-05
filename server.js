const express = require("express");
var db = require("./mydb.js");

const app = express();

app.use(express.json());

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
app.post("/posts", (req, res) => {
  const newPost = {
    id: req.body.id,
    category: req.body.category,
    title: req.body.title,
    content: req.body.content
  };
  // contract.methods.addPost ....
  db.posts.unshift(newPost);
  
  res.json(newPost);
});

// Delete
app.delete("/posts/:id", (req, res) => {
  db.posts = db.posts.filter(post => post.id !== req.params.id);
  res.json(db.posts);
});

// Categories METHODS
app.get("/categories", (req, res) => {
  // 
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

app.listen(port, () => console.log(`Server started on port ${port}`));

// console.log(db);
