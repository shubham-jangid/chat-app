const path = require("path");
const express = require("express");
const socketIO = require("socket.io");
const http = require("http");

const publicPath = path.join(__dirname, "../public");
const port = process.env.PORT || 3000;
const app = express();
const server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on("connection", socket => {
  console.log("new user connected");

  socket.emit("newMessage", {
    from: "example.gmai.com",
    text: "hello",
    createdAt: 123
  });

  //   socket.emit("newEmail", {
  //     from: "example@gmail.com",
  //     text: "hello exampole",
  //     createdAt: 123
  //   });

  socket.on("createMessage", newMessage => {
    console.log("create Email", newMessage);
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

server.listen(port, () => {
  console.log(` server is up on ${port}`);
});
