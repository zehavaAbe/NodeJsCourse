const http = require('http');
const webSocket = require('ws');
const path = require('path');
const fs = require('fs');

const chatHandler= server=>{
    //2 -- Initialize the web server
const wss = new webSocket.Server({ server });
// handeling Client Connections 
wss.on('connection', ws => {
    // in case of message from client
    ws.on('message', message => {
        console.log(`Recived:${message}`)
        wss.clients.forEach(client => {
            if (client.readyState === webSocket.OPEN) {
                client.send(message)
            }
        })
    });
    // send a 'connection' message
    console.log("client connected")
    ws.send('Welcome to the chat')
});
}

module.exports = {chatHandler};
