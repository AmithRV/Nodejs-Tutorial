const http = require('http');
const fs = require('fs');

const port = 3000;

http.createServer((req, res) => {
    if (req.url === '/') {
        fs.readFile('../Html/welcome.html', (error, data) => {
            if (data) {
                res.writeHead(200, { 'Content-type': 'text' })
                res.write(data);
                res.end();
            } else if (error) {
                res.write('Error');
                res.end();
            }
        })
    } else if (req.url === '/signup') {
        fs.readFile('../Html/signup.html', (error, data) => {
            if (data) {
                res.writeHead(200, { 'Content-type': 'text' })
                res.write(data);
                res.end();
            } else if (error) {
                res.write('Error');
                res.end();
            }
        })
    } else if (req.url === '/login') {
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
    } else if (req.url === '/details') {
        fs.readFile('../Html/details.html', (error, data) => {
            if (data) {
                res.writeHead(200, { 'Content-type': 'text' })
                res.write(data);
                res.end();
            } else if (error) {
                res.write('Error');
                res.end();
            }
        })
    }
    else {
        fs.readFile('../Html/page-not-found.html', (error, data) => {
            if (data) {
                res.writeHead(404, { 'Content-type': 'text' })
                res.write(data);
                res.end();
            } else if (error) {
                res.write('Error');
                res.end();
            }
        })
    }

}).listen(port, () => {
    console.log(`server started on port :${port}`)
});