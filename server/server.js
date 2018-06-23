const path = require("path");
const express = require("express");
const socketIO = require("socket.io");
const http = require("http");

const { generateMessage, generateLocationMessage } = require("./utils/message");

const publicPath = path.join(__dirname, "../public");
const port = process.env.PORT || 3000;
const app = express();
const server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on("connection", socket => {
  console.log("new user connected");

  socket.emit("newMessage", generateMessage("admin", "welcome to chat app 2")); // this is for client

  socket.broadcast.emit(
    "newMessage",
    generateMessage("admin", "new user joined")
  ); // this will send the message to all other user accept the on who joined

  socket.on("createMessage", (message, callback) => {
    // this is for server
    console.log("create message  recieved from user", message);
    io.emit("newMessage", generateMessage(message.from, message.text));
    callback("This is from the server.");
    // socket.broadcast.emit('newMessage', {
    //   from: message.from,
    //   text: message.text,
    //   createdAt: new Date().getTime()
    // });
  });
  socket.on("createLocationMessage", coords => {
    console.log("location is ", coords);
    io.emit(
      "newLocationMessage",
      generateLocationMessage("admin", coords.latitude, coords.longitude)
    );
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

server.listen(port, () => {
  console.log(` server is up on ${port}`);
});
