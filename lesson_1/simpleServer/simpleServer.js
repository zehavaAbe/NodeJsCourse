// 1. import http module
const http = require('http');

// 2. Create a server

const server = http.createServer((request,response )=>{
// 3. Create default response

response.end('hello world !!')
});
.


// 4. Start the server
const PORT = 3000;
server.listen(PORT,()=>{
    console.log(`server is running on http://localhost:${PORT}`)
})