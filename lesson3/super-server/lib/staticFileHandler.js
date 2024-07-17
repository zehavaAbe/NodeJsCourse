// 1. import http module
const path = require('path');
const fs = require('fs');

const serverStaticFile = (request, response) => {
    // 3. Create default response

    // 3.1 Parse URL and determine filename
    const url = request.url === '/' ? 'index.html' : request.url;
    const filePath = path.join(__dirname, "../public", url);
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
};

// 4. Start the server
module.exports= {serverStaticFile};
