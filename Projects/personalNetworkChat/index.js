const http = require('http');
const url = require('url');
const fs = require('fs');
const events = require('events');

const port = 8080;

const eventEmitter = new events.EventEmitter();

let message_data = [];

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

http.createServer((req, res) => {
    const urlPath = url.parse(req.url, true);
    console.log('url : ', urlPath.pathname)
    // console.log('message : ', message, '\n');
    // console.log('clients : ', getIPs(server, '\n'));
    // console.log(req.connection.remoteAddress);

    if (urlPath.pathname === '/') {
        fs.readFile('./index.html', (error, data) => {
            if (data) {
                res.writeHead(200, { 'Content-type': 'text/html' })
                res.write(data + `<br/><br/><div>${message_data}</div>`);
                res.end();
            } else if (error) {
                res.write('Error');
                res.end();
            }
        })
    } else if (urlPath.pathname === '/message') {
        const temp = `<style>
        .app{
            background-color:lightgreen;
            border-radius:10px;
            border:1px solid red
        }
        .date-class{
            display:flex;
            margin:10px 0px 0px 20px;
        }
        .address-class{
            display:flex;
            margin:10px 20px;
        }
        .message-class{
            margin:20px;
        }
        </style >` +
            '<div class="app">' +
            '<span class="date-class">' + new Date().toLocaleString() + '</span>' + '<br/>' +
            '<span class="address-class">' + req.connection.remoteAddress + '</span>' + '<br/>' +
            '<span class="message-class">' + urlPath.query.message_content + '</span>' + '<br/><br/>' +
            '</div>'

        message_data.push(temp);
        res.writeHead(301, { Location: '/' });
        res.end();
    }
}).listen(port, () => {
    console.log(`server started on port :${port}`)
});