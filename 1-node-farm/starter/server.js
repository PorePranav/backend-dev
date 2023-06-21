const http = require('http');
const url = require('url');
const fs = require('fs');

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const dataObj = JSON.parse(data);

const server = http.createServer((req, res) => {
    const pathName = req.url;
    if(pathName === '/' || pathName === '/overview') {
        res.end('This is the overview');
    }
    else if(pathName === '/product') {
        res.end('This is the product');
    } 
    else if(pathName === '/api') {
        res.end(dataObj);
    }
    else {
        res.writeHead(404, {
            'Content-type': 'text/html',
            'my-own-header': 'Hello, World!'
        });
        res.end('<h1>Page not found</h1>');
    }
});

server.listen(8080, '127.0.0.1', () => {
    console.log('Server started on port 8080');
});

