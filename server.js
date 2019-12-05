const express = require("express");
var db = require("./mydb.js");

const app = express();

app.use(express.json());

app.get("/posts", (req, res) => {
  res.json(db.posts);
});

app.post("/posts", (req, res) => {
  const newPost = {
    id: req.body.id,
    category: req.body.category,
    title: req.body.title,
    content: req.body.content
  };

  db.posts.push(newPost);
  res.json(newPost);
});

app.delete("/posts/:id", (req, res) => {
  db.posts = db.posts.filter(post => post.id !== parseInt(req.params.id));
  res.json(db.posts);
});

const port = process.env.PORT || 7000;

app.listen(port, () => console.log(`Server started on port ${port}`));

// console.log(db);
