/* Pusherintegration.js
Server side node.js script that services real-time websocket requests
Allows websocket connections to subscribe and publish to MQTT topics
*/
 
var express = require("express");
var app     = express();
var path    = require("path");
var request = require("request");
const server = require('http').createServer(app);
var mqtt = require('mqtt');

app.get('/',function(req,res){
  res.sendFile(path.join(__dirname+'/index.html')); //__dirname : It will resolve to your project folder.
});

// app.use(express.static('assets')); //This folder contains the css and js files
app.use("/assets", express.static(__dirname + '/assets'));

// create a socket object that listens on port 5000
var io = require('socket.io')(app.listen(3001,'10.0.0.16'));

console.log("running at 10.0.0.16:3001")
 
var sys = require('util');
var net = require('net');


// create an mqtt client object and connect to the mqtt broker
var client = mqtt.connect('mqtt://10.0.0.16');
io.on('connection', function (socket) {
    console.log("socket connected");

    // socket connection indicates what mqtt topic to subscribe to in data.topic
    socket.on('subscribe', function (data) {
        console.log('Subscribing to '+data.topic);
        socket.join(data.topic);
        client.subscribe(data.topic);
    });
    // when socket connection publishes a message, forward that message
    // to the mqtt broker
    socket.on('publish', function (data) {
        console.log('Publishing topic '+data.topic);
        client.publish(data.topic,data.payload);
	//client.publish(data);
    });
});

 
// listen to messages coming from the mqtt broker
client.on('message', function (topic, payload, packet) {
    /*console.log(JSON.stringify(packet));
    console.log(JSON.stringify(payload));
    console.log(topic+'='+String(payload));*/
    io.sockets.emit('mqtt',{'topic':String(topic),
                            'payload':String(payload),
			    });
});

const port = process.env.PORT || 3000;

server.listen(port);
console.log(`Server listening on http://localhost:${port}`);