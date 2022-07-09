const http = require('http');

const port = 3000;

http.createServer((req, res) => {
    console.log('req : ', req.url)
    res.write(`sample server running running on port ${port}`);
    res.end();
}).listen(port);