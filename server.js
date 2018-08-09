'use strict'

var aedes = require('./aedes')()
var server = require('net').createServer(aedes.handle)
var httpServer = require('http').createServer()
var ws = require('websocket-stream')
var port = 8888
var wsPort = process.env.PORT || 3000

server.listen(port, function () {
    console.log('server listening on port', port)
})

ws.createServer({
    server: httpServer
}, aedes.handle)

httpServer.listen(wsPort, function () {
    console.log('websocket server listening on port', wsPort)
})

aedes.on('clientError', function (client, err) {
    console.log('client error', client.id, err.message, err.stack)
})

aedes.on('connectionError', function (client, err) {
    console.log('client error', client, err.message, err.stack)
})

aedes.on('publish', function (packet, client) { // when client publish something
    if (client) {
        console.log('publish: message from client', client.id, packet)
    }
})


// publish a message on "iot" topic
setInterval(() => {
    aedes.publish({ topic: "iot", packet: "some text packet" }, () => {
        console.log("published on 'iot' topic");
    })
}, 4000)

aedes.on('subscribe', function (subscriptions, client) {
    if (client) {
        console.log('subscribe from client', subscriptions, client.id)
    }
})


aedes.on('client', function (client) {
    console.log('new client')
    console.log('client.id: ', client.id)

})
