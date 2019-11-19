var
  //MongoClient = require('mongodb').MongoClient,
  io          = require("socket.io").listen(3000),
  //chokidar    = require("chokidar"),
  //fs          = require('fs'),


  // Initialize watcher

  //watcher = chokidar.watch(__dirname+ "/getHairs", { persistent: true }),


  // Functions

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

  sendMessage = (mes, type = false, socket = false) => {
    if (type === "ann") {
      mes.notMessage = true;

      if (socket) {
        socket.emit("get announce", mes);
      } else {
        io.emit("get announce", mes);
      }

    } else if (type === "first") {
      mes.notMessage = true;

      messages.push(mes);

      if (mes.length > maxMessages) { messages.shift() };

      io.emit("get first", messages);

    } else {
      messages.push(mes);

      if (mes.length > maxMessages) { messages.shift() };

      io.emit("get message", mes);
    }
  },


  // Variables

  messages    = [],
  maxMessages = 100,

  users = [],
  length = 0;


// Socket event listeners

io.on("connection", (socket) => {

  // Emit data to entered client

  length++;

  io.emit("get users", length);

  socket.emit("get first", messages, "first");

  sendMessage({
    text: "Welcome to The Fluffies carrot, enjoy! :3"
  }, "ann", socket);

  socket.emit("isnt nickname");   // Reset on reconect server


  // Receiving messages to the server

  socket.on("send message", (msg) => {
    if (msg.text.length > 99) return;  // Text limit

    if (!msg.name.trim() || msg.name.length > 15) {
      socket.emit("isnt nickname");

      return
    };


    // Message assembly

    msg.text = msg.text.charAt(0).toUpperCase() + msg.text.slice(1);  // Capitalize
    msg.time = time();
    msg.id   = users[socket.id].id;


    messages.push(msg);

    if (messages.length > maxMessages) { messages.shift() };


    // Send messages to client

    io.emit("get message", msg);
  });


  // Checking name

  socket.on("check name", (name) => {
    name = name.trim();

    if (!name || name.length > 15) {
      socket.emit("isnt nickname");

      return
    };


    // Duplicate check

    var sockets = Object.keys(users);

    for (var i = 0, len = sockets.length; i < len; i++) {
      if (users[sockets[i]].name === name) {
        socket.emit("isnt nickname");

        return
      };
    };


    // Add to users list

    users[socket.id] = {
      name: name,
      id: Math.round(Math.random() * 999999)
    };


    // Broadcast to users about connected client

    sendMessage({
      text: "#" + users[socket.id].id + " joined as " + users[socket.id].name
    }, "ann");
  });


  // Removing connected client from list

  socket.on("disconnect", () => {
    if (users[socket.id]) {
      sendMessage({
        text: users[socket.id].name + " disconnected"
      }, "ann");
    };

    delete users[socket.id];

    length--;

    io.emit("get users", length);
  });
});


// File watcher event listeners

/*watcher.on('add', path => {
  console.log(`File ${path} has been added`);

  fs.readFile(path, (err, data) => {
    if (err) throw err;

    console.log(data.toString('utf8'));

    fs.unlink(path, err => {
      if (err) throw err;

      console.log(path + ' was deleted');
    });
  });
});


var url = "mongodb://localhost:27017/mydb";

MongoClient.connect(url, (err, db) => {
  if (err) throw err;

  console.log("Database created!");

  db.close();
});*/