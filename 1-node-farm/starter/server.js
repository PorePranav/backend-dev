const http = require('http');
const url = require('url');

const server = http.createServer((req, res) => {
    const pathName = req.url;
    if(pathName === '/' || pathName === '/overview') {
        res.end('This is the overview');
    }
    else if(pathName === '/product') {
        res.end('This is the product');
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

