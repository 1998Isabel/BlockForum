const users = [
  {
    addr: "xxxx",
    name: "test"
  }
];

const categories = [
  "News",
  "International",
  "Sports",
  "Entertainment",
  "Economics",
];

const posts = [
  {
    id: "1",
    category: "Economics",
    title: "Post1",
    content: "This is the first post!"
  },
  {
    id: "2",
    category: "Sports",
    title: "Post2",
    content: "This is the 2nd post!"
  },
  {
    id: "3",
    category: "News",
    title: "Post3",
    content: "This is the 3rd post!"
  }
];

const db = {
  users,
  categories,
  posts
};

module.exports = db;
