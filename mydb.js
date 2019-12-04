const users = [
  {
    addr: "xxxx",
    name: "test"
  }
];

const categories = [
  {
    id: 1,
    name: "All"
  }
];

const posts = [
  {
    id: 1,
    category: 1,
    title: "Post1",
    content: "This is the first post!"
  }
];

const db = {
  users,
  categories,
  posts
};

module.exports = db;
