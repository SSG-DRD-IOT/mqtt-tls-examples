var mqtt = require('mqtt');
var fs = require('fs');
var KEY = '../../certs/server.key';
var CERT = '../../certs/server.crt';
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

var data = {
  sensor_id: "temperature",
  value: 30,
  timestamp: Date.now()
};

client.on('connect', function(){
	console.log("Connected to MQTT broker at " + HOST + ":" + PORT);
  console.log("Publishing: " + JSON.stringify((data)));
  client.publish('sensors/temperature/data', JSON.stringify((data)));
});
