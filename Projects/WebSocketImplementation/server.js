const WebSocketServer = require('websocket').server;
const http = require('http');
const url = require('url');
const fs = require('fs');

const server = http.createServer(function (request, response) {
    const urlPath = url.parse(request.url, true);

    console.log((new Date()) + ' Received request for ' + request.url);
    // response.writeHead(404);
    // response.end();

    if (urlPath.pathname === '/') {
        fs.readFile('./index.html', (error, data) => {
            if (data) {
                response.writeHead(200, { 'Content-type': 'text/html' })
                response.write(data + `<br/><br/><div>${'<--message comes here-->'}</div>`);
                response.end();
            } else if (error) {
                response.write('Error');
                response.end();
            }
        })
    } else {
        fs.readFile('./page-not-found.html', (error, data) => {
            if (data) {
                response.writeHead(404, { 'Content-type': 'text/html' })
                response.write(data);
                response.end();
            } else if (error) {
                response.write('Error');
                response.end();
            }
        })
    }
});
server.listen(8080, function () {
    console.log('\n' + (new Date()) + ' Server is listening on port 8080\n\n');
});


wsServer = new WebSocketServer({
    httpServer: server,
    autoAcceptConnections: false
});

function originIsAllowed(origin) {
    // put logic here to detect whether the specified origin is allowed.
    return true;
}

wsServer.on('request', function (request) {
    // if (!originIsAllowed(request.origin)) {
    //     // Make sure we only accept requests from an allowed origin
    //     request.reject();
    //     console.log((new Date()) + ' Connection from origin ' + request.origin + ' rejected.');
    //     return;
    // }

    console.log('origin : ', request.origin)
    var connection = request.accept('echo-protocol', request.origin);
    console.log((new Date()) + ' Connection accepted.');
    connection.on('message', function (message) {
        if (message.type === 'utf8') {
            console.log('Received Message: ' + message.utf8Data);
            connection.sendUTF(message.utf8Data);
        }
        else if (message.type === 'binary') {
            console.log('Received Binary Message of ' + message.binaryData.length + ' bytes');
            connection.sendBytes(message.binaryData);
        }
    });
    connection.on('close', function (reasonCode, description) {
        console.log((new Date()) + ' Peer ' + connection.remoteAddress + ' disconnected.');
    });
});