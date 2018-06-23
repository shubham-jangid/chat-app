var socket = io();

socket.on("connect", function() {
  console.log("connected to server");
});

socket.on("disconnect", function() {
  console.log("dissconnected from server");
});

socket.on("newMessage", function(message) {
  console.log("newMessage  ", message);
  var li = jQuery("<li></li>");

  li.text(`${message.from}:${message.text}`);

  jQuery("#message").append(li);
});

socket.on("newLocationMessage", function(message) {
  var li = jQuery("<li></li>");
  var a = jQuery('<a target="_blank">my current location</a>');

  li.text(`${message.from}`);
  a.attr("href", message.url);
  li.append(a);
  jQuery("#message").append(li);
});

jQuery("#message-form").on("submit", function(e) {
  e.preventDefault();

  socket.emit(
    "createMessage",
    {
      from: "user",
      text: jQuery("[name=message]").val()
    },
    function() {}
  );
});

var locationButton = jQuery("#send-location");
locationButton.on("click", function() {
  if (!navigator.geolocation) {
    return alert("geolocation is not supported by your browser");
  }
  navigator.geolocation.getCurrentPosition(function(position) {
    console.log(position);

    socket.emit("createLocationMessage", {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });
  }),
    function() {
      alert("unable to fetch locationi");
    };
});
