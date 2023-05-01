const express = require("express");
const url = require("url");

const app = express();

const port = 3000;

let posts = [];
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (_, res) => {
  res.json(posts);
});
app.post("/posts", (req, res) => {
  const { title, name, text } = req.body;

  posts.push({
    id: posts.length + 1,
    title,
    name,
    text,
    createdDt: Date(),
  });
  res.json({
    title,
    name,
    text,
  });
});
app.delete("/posts/:id", (req, res) => {
  const id = req.params.id;
  const filteredPosts = posts.filter((post) => post.id !== +id);
  const isLengthChanged = posts.length !== filteredPosts.length;
  posts = filteredPosts;

  if (isLengthChanged) {
    res.json("SUCCESS");
    return;
  }
  res.json("NOT CHANGE");
});

app.listen(port, () => console.log(`START SERVER, PORT ${port}`));
