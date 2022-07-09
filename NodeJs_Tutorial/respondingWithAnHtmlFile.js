const http = require('http');
const fs = require('fs');

const port = 3000;

http.createServer((req, res) => {
    fs.readFile('../Html/login.html', (error, data) => {
        if (data) {
            res.writeHead(200, { 'Content-type': 'text' })
            res.write(data);
            res.end();
        } else if (error) {
            res.write('Error');
            res.end();
        }

    })
}).listen(port);