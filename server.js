
var five = require("johnny-five");
const { Board, Motor } = require("johnny-five");
let {setMotorSpeed, stop, setLED, setLEDoff, stopMotor} = require("./board")
var speed = 100;
port = process.argv[2]

var Server = function (port) {
  // Variables
  this.express = require("express");
  this.app = this.express();
  this.server = require("http").Server(this.app);
  this.io = require("socket.io")(this.server);
  this.PORT = port;
  this.app.use(this.express.static(__dirname));
  connections = {};

  // Methods

  // Send message to client
  sendMsg = function (clientID, packageID, msg) {
    connections[clientID].emit(packageID, msg);
  };

  // Use this approach to handle multiple client connections
  addConnection = function (socket) {
    let { id } = socket;
    connections[id] = socket;
    sendMsg(id, "exampleServerEvent", "Its brisaac...");
    console.log(id, " connected");
  };

  // Start server
  this.start = function () {
    this.server.listen(this.PORT);
    console.log("Listening on port: ", this.PORT);
  };

  // Events
  this.io.on("connection", function (socket) {
    addConnection(socket);

    // Add listeners
    socket.on("speed", function (data) {
      console.log("Message from client: ", 
      );
      let {speed} = data
      setMotorSpeed(speed)
    });

    socket.on("stopMotor", function (data) {
        console.log("Message from client: ", "Stop motor");
        stopMotor()
      });

    socket.on("ledon", function (data) {
        console.log("Message from client: ", "Light on");
        setLEDon()
      });

      socket.on("ledoff", function (data) {
        console.log("Message from client: ", "Light off");
        setLEDoff()
      });
  });

  return this;
};

var server = new Server(8084);
server.start();