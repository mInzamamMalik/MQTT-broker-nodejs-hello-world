



var mqtt = require('mqtt')
var client = mqtt.connect(
    {
        host: 'localhost',
        port: 8888,
        keepalive: 10000
    }
)

client.on('connect', function () {
    client.subscribe('iot')
    console.log("connected")
})
client.on('message', function (topic, message) {
    context = message.toString();
    console.log(context, message)
})