const http = require('http');
const fs = require('fs');
const url = require('url');

const port = 3000;
let fileArray = [];

http.createServer((req, res) => {
    const urlPath = url.parse(req.url, true);
    console.log(req.url);

    if (urlPath.pathname === '/') {
        fs.readdirSync('./', { withFileTypes: true })
            .filter(item => !item.isDirectory())
            .map(item => {
                if (item.name.split('.')[1] === 'html' || item.name.split('.')[1] === 'js') {
                } else {
                    fileArray.push(item.name);
                }
            })

        fs.readFile('./index.html', (error, data) => {
            if (data) {
                res.writeHead(200, { 'Content-type': 'text/html' })
                res.write(`
                <style>
                    body {
                    margin: 0;
                    }
                    .app {
                    border: 1px solid red;
                    display: flex;
                    }
                    .wrap {
                    margin: 25px;
                    padding: 25px;
                    display: flex;
                    flex-direction: column;
                    box-sizing: border-box;
                    width: 100%;
                    flex: 1;
                    border: 1px solid green;
                    }
                    .header {
                    width: 100px;
                    }
                    .create-button {
                    width: 125px;
                    height: 40px;
                    font-weight: bolder;
                    font-size: 16px;
                    }
                    .body {
                    margin-top: 25px;
                    }
                    table {
                    font-family: arial, sans-serif;
                    border-collapse: collapse;
                    width: 100%;
                    }

                    td,
                    th {
                    border: 1px solid #dddddd;
                    text-align: left;
                    padding: 8px;
                    }

                    tr:nth-child(even) {
                    background-color: #dddddd;
                    }
                </style>
                <body>
                <div class="app">
                  <div class="wrap">
                    <div class="header">
                      <a href="create-file"><button class="create-button">Create File</button></a>
                    </div>
                    <div class="body">
                    <table>
                        <tr>
                          <th>File Name</th>
                          <th>View</th>
                        </tr>
                        ${fileArray.filter(function (value, index, array) { return array.indexOf(value) === index; }).map(e => {
                    return (`<tr>
                    <td> ${e}  </td> 
                    <td> <a href='details'><=></a> </td> 
                    </tr>`)
                })}
                      </table>
                    </div>
                  </div>
                </div>
              </body>`);
                // var data = fs.readFileSync('testfile-1', 'utf8');
                // console.log(data.toString());
                res.end();
            } else if (error) {
                res.write('Error');
                res.end();
            }
        })


    } else if (urlPath.pathname === '/create-file') {
        fs.readFile('./createFile.html', (error, data) => {
            if (data) {
                res.writeHead(200, { 'Content-type': 'text/html' })
                res.write(data);
                res.end();
            } else if (error) {
                res.write('Error');
                res.end();
            }
        })
    } else if (urlPath.pathname === '/create-file-request') {
        res.writeHead(200, { 'Content-type': 'text/html' });
        fs.writeFile(urlPath.query.file_name, urlPath.query.file_content, function (err) {
            if (err) throw err;
            console.log('Saved!');
        });
        res.writeHead(301, { Location: '/' });
        res.end();
    } else if (urlPath.pathname === '/details') {
        fs.readFile('./details.html', (error, data) => {
            if (data) {
                res.writeHead(200, { 'Content-type': 'text/html' })
                res.write(data);
                res.end();
            } else if (error) {
                res.write('Error');
                res.end();
            }
        })
    }
    else {
        fs.readFile('./page-not-found.html', (error, data) => {
            if (data) {
                res.writeHead(404, { 'Content-type': 'text/html' })
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