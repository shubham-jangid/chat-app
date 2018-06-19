const path = require("path");
const express = require("express");
const socketIO = require("socket.io");
const http = require("http");

const { generateMessage } = require("./utils/message");

const publicPath = path.join(__dirname, "../public");
const port = process.env.PORT || 3000;
const app = express();
const server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on("connection", socket => {
  console.log("new user connected");

  socket.emit("newMessage", generateMessage("admin", "welcome to chat app 2"));

  socket.broadcast.emit("newMessage", ("admin", "new user joined"));

  socket.on("createMessage", message => {
    console.log("create message server recievf", message);
    io.emit("newMessage", (message.from, message.text));
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

server.listen(port, () => {
  console.log(` server is up on ${port}`);
});
