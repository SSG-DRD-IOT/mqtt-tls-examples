var mqtt = require('mqtt');
var fs = require('fs');
var KEY = '../../certs/client.key';
var CERT = '../../certs/client.crt';
var TRUSTED_CA_LIST = '../../certs/ca.crt';
var HOST = '192.168.1.1';
var PORT = 8883;

var options = {
  host: HOST,
  port: PORT,
  keyPath: KEY,
  certPath: CERT,
  rejectUnauthorized : false,
  ca: TRUSTED_CA_LIST
};

var client = mqtt.createSecureClient(options);

client.subscribe('sensors/temperature/data');

client.on('connect', function(){
	console.log("Connected to MQTT broker at " + HOST + ":" + PORT);
});

client.on('message', function(topic, message) {
  console.log("Recevied: " + message.toString());
});
