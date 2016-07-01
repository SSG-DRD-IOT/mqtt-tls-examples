import sys
import paho.mqtt.client as mqtt

def on_connect(client, obj, flags, rc):
    print("Connected to MQTT broker at: " + str(rc))

def on_message(client, obj, msg):
    print("Connected to MQTT broker at " + str(msg.payload))

def on_publish(client, obj, mid):
    print("Pubished: " + str(mid))

def on_subscribe(client, obj, mid, granted_qos):
    print("Subscribed: sensors/temperature/data")

def on_log(client, obj, level, string):
    print(string)

client = mqtt.Client()
client.on_message = on_message
client.on_connect = on_connect
client.on_publish = on_publish
client.on_subscribe = on_subscribe

client.tls_set('../../certs/ca.crt',
    '../../certs/client.crt',
    '../../certs/client.key')

client.connect("192.168.1.1", 8883, 60)
client.subscribe("sensors/temperature/data", 0)

client.loop_forever()
