const express = require("express");
var db = require("./mydb.js");

const app = express();

app.use(express.json());

app.get("/posts", (req, res) => {
  res.json(db.posts);
});

const port = process.env.PORT || 7000;

app.listen(port, () => console.log(`Server started on port ${port}`));

// console.log(db);
