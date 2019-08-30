var
  app  = require("express")(),
  http = require("http").createServer(app),
    io = require("socket.io")(http),

  time = () => {
    var
      date = new Date(),

      minutes = date.getMinutes(),
      hour  = date.getHours(),
      day   = date.getDate(),
      month = date.getMonth() + 1

      if (minutes < 10) { minutes = "0" + minutes }
      if (   hour < 10) {    hour = "0" + hour    }
      if (    day < 10) {     day = "0" + day     }
      if (  month < 10) {   month = "0" + month   }

    return day + "." + month + " at " + hour + ":" + minutes
  },

  sendMessage = (mes) => {
    messages.push(mes);

    if (mes.length > maxMessages) { messages.shift() };

    io.emit("get message", messages);
  },

  messages = [
    { text: "Welcome to The Fluffies carrot, enjoy! :3" }
  ],

  maxMessages = 50,

  users = [],
  length = 0;


io.on("connection", (socket) => {
  length++;

  io.emit("get users", length);

  socket.emit("get message", messages);
  socket.emit("isnt nickname");   // Reset on reconect server

  socket.on("send message", (msg) => {
    if (msg.text.length > 100) return;;

    if (!msg.name.trim() || msg.name.length > 15) {
      socket.emit("isnt nickname");

      return
    };

    msg.text = msg.text.charAt(0).toUpperCase() + msg.text.slice(1);
    msg.time = time();
    msg.id   = users[socket.id].id;

    messages.push(msg);

    if (messages.length > maxMessages) { messages.shift() };

    io.emit("get message", messages);
  });

  socket.on("check name", (name) => {
    name = name.trim()

    if (!name || name.length > 15) {
      socket.emit("isnt nickname");

      return
    };

    var sockets = Object.keys(users);

    for (var i = 0, len = sockets.length; i < len; i++) {
      if (users[sockets[i]].name === name) {
        socket.emit("isnt nickname");

        return
      };
    };

    users[socket.id] = {
      name: name,
      id: Math.round(Math.random() * 999999)
    };

    var msg = {
      text: "#" + users[socket.id].id + " joined as " + users[socket.id].name
    };

    sendMessage(msg);
  });

  socket.on('disconnect', () => {
    if (users[socket.id]) {
      var msg = {
        text: users[socket.id].name + " disconnected"
      };

      sendMessage(msg);
    };

    delete users[socket.id];

    length--;

    io.emit("get users", length);
  });
});


http.listen(3000, () => {
  console.log("listening on 3000");
});