const express = require("express");
const app = express();
const port = 3000;
const static = require('node-static');
const http = require('http');
const file = new static.Server(__dirname);

http.createServer((req, res) => {
  file.serve(req, res);
}).listen(8080);

const comments = [
  "Delicious!",
  "Yum!",
  "Can I have the recipe for that?",
  "That looks absolutely fantastic!",
  "**stomach grumbles**",
];

app.get("/random-comment", (req, res) => {
  res.send(JSON.stringify({
    data: comments[Math.floor(Math.random() * comments.length)],
  }));
});

app.listen(port);
