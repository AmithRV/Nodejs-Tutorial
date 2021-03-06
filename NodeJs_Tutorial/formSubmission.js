const http = require('http');
const fs = require('fs');
const url = require('url');
const date = require('./dateAndTime');

const port = 3000;

http.createServer((req, res) => {
    const urlPath = url.parse(req.url, true); // we add true to get the result in the form of an object

    console.log(req.url);
    if (urlPath.pathname === '/') {
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
    } else if (urlPath.pathname === '/signup') {
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
    } else if (urlPath.pathname === '/login') {
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
    } else if (urlPath.pathname === '/details') {
        res.writeHead(200, { 'Content-type': 'text/html' })
        res.write(`
        <span>Date : ${new Date(date.myDateTime()).toLocaleString()}</span>
        <div class="body">
                    <br/>
                    <div class="wrap_1" >
                        <label>Name : ${urlPath ? urlPath.query.name ? urlPath.query.name : '' : ''}</label>
                    </div>
                    <br/>
                    <div class="wrap_1">
                        <label>Age: ${urlPath ? urlPath.query.age ? urlPath.query.age : '' : ''}</label>
                    </div>
                    <br/>
                    <div class="wrap_1">
                        <label>Phone: ${urlPath ? urlPath.query.phone ? urlPath.query.phone : '' : ''}</label>
                    </div>
                    <br/>
                    <div>
                        <a href='/'> Home </a>
                    </div>
                </div>`);
        res.end();
    } else {
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