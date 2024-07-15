const http = require('http');
const webSocket = require('ws');
const path = require('path');
const fs = require('fs');

//1-- create a Server
const server = http.createServer((request, response) => {
    const url = request.url === '/' ? 'index.html' : request.url;
    const filePath = path.join(__dirname, "public", url);
    const fileExt = path.extname(filePath);
        let contentType;
        
        switch (fileExt) {
            case 'html': contentType = { 'Content-Type': 'text/html' };break;
              
            case 'jpg': contentType = { 'Content-Type': 'image/png' };break;
            
            case 'css': contentType = { 'Content-Type': 'text/css' };break;
            
            default:
                break;
    };
    console.log(`filePath:${filePath}`)
    // 3.2 if no PATH is defined then index.html
    fs.readFile(filePath, (err, data) => { 

        //set the correct response content type
        if (err) {
            if (err.code === 'ENOENT') {
                const errorFile = path.join(__dirname, 'public', '404.html')
                fs.readFile(errorFile, (error, content) => {
                    // Asumption all is 
                    response.writeHead(404, { 'Content-Type': 'text/html' })
                    response.end(content, 'utf8')
                })
            }
            else {
                response.writeHead(500);
                response.end(`Server error:${error.code}`)
            }
        }
        else {
            response.writeHead(200, contentType)
            response.end(data, 'utf8');
        }

        // 1. check for errors' if error exists return 404.html
        // 2. if all is well' return file

    })
    // 3.3 ELSE look for the desired file
    // 3.4 IF file not found - send error
    // 3.5 IF file found - return file
});
//2 -- Initialize the web server
const wss = new webSocket.Server({ server });
// handeling Client Connections 
wss.on('connection', ws => {
    // in case of message from client
    ws.on('message', message => {
        console.log(`Recived:${message}`)
        wss.clients.forEach(client => {
            if(client.readyState === webSocket.OPEN){
                client.send(message)
            }
        })
    });
    // send a 'connection' message
    console.log("client connected")
    ws.send('Welcome to the chat')
});

//3 -- Start the server

const PORT = 3006
server.listen(PORT, () => {
    console.log(`server is running on http://localhost:${PORT}`)
})