var http = require('http');
var fs = require('fs');

const port = 8080

http.createServer(function (req, res) {
    fs.readFile('../Html/demofile1.html', function (err, data) {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(data);
        return res.end();
    });

    fs.appendFile('mynewfile1.txt', 'Hello content!', function (err) {
        if (err) throw err;
        console.log('Saved!');
    });

    fs.open('mynewfile2.txt', 'w', function (err, file) {
        if (err) throw err;
        console.log('Saved!');
    });

    fs.writeFile('mynewfile3.txt', 'Hello content!', function (err) {
        if (err) throw err;
        console.log('Saved!');
    });

    //   fs.unlink('mynewfile2.txt', function (err) {
    //     if (err) throw err;
    //     console.log('File deleted!');
    //   });

    fs.rename('mynewfile1.txt', 'myrenamedfile.txt', function (err) {
        if (err) throw err;
        console.log('File Renamed!');
    });
}).listen(port, () => {
    console.log(`server started on port :${port}`)
});