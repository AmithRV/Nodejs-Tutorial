const http = require('http');
const url = require('url');
const fs = require('fs');
const events = require('events');

const port = 3000;

const eventEmitter = new events.EventEmitter();

let message = [];

//Create an event handler: 
const eventHandler = function () {
    console.log('\n new message received \n');
}

//Assign the eventhandler to an event: 
eventEmitter.on('new message received', eventHandler);

function getIPs(server) {
    var handles = process._getActiveHandles(),
        ips = [];

    for (var i = 0, handle, len = handles.length; i < len; ++i) {
        handle = handles[i];
        if (handle.readable
            && handle.writable
            && handle.server === server
            && handle.remoteAddress) {
            ips.push(handle.remoteAddress);
        }
    }

    return ips;
}

const server = http.createServer((req, res) => {
    const urlPath = url.parse(req.url, true);
    console.log('message : ', message, '\n');
    console.log('clients : ', getIPs(server, '\n'));

    if (urlPath.pathname === '/') {

        fs.readFile('./index.html', (error, data) => {
            if (data) {
                res.writeHead(200, { 'Content-type': 'text/html' })
                res.write(data + `<br/><br/><div>${message}</div>`);
                res.end();
            } else if (error) {
                res.write('Error');
                res.end();
            }
        })
    } else if (urlPath.pathname === '/message') {
        const temp = new Date().toLocaleString() + '<br/>' + urlPath.query.message + '<br/><br/>'
        message.push(temp);
        res.writeHead(301, { Location: '/' });
        res.end();
    }
})

server.listen(port, () => {
    console.log(`server started on port :${port}`)
});