var socket = io();

socket.on("connect", function() {
  console.log("connected to server");
});

socket.on("disconnect", function() {
  console.log("dissconnected from server");
});

socket.on("newMessage", function(message) {
  console.log("new message recieved", message);
});

socket.on("fromAdmin", function(message) {
  console.log("message from admin", message);
});
