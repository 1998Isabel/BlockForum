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
  },
  {
    id: 2,
    name: "Music"
  },
  {
    id: 3,
    name: "News"
  }
];

const posts = [
  {
    id: 1,
    category: 1,
    title: "Post1",
    content: "This is the first post!"
  },
  {
    id: 2,
    category: 2,
    title: "Post2",
    content: "This is the 2nd post!"
  },
  {
    id: 3,
    category: 1,
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
