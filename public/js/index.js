var socket = io();

socket.on("connect", function() {
  console.log("connected to server");

  socket.emit("createMessage", {
    from: "shubhamjangdi",
    text: "from clinet"
  });
});

socket.on("disconnect", function() {
  console.log("dissconnected from server");
});

socket.on("newMessage", function(message) {
  console.log("new message recieved", message);
});

// socket.on("newEmail", function(email) {
//   console.log("new email  ", email);
// });
