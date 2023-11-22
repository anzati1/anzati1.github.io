const http = require('http');
const fs = require('fs');

http.createServer(function (req, res) {
  if (req.method === 'POST') {
    let body = '';

    req.on('data', function (data) {
      body += data;
    });

    req.on('end', function () {
      fs.writeFile('data.txt', body, function (err) {
        if (err) {
          res.writeHead(500, { 'Content-Type': 'text/plain' });
          res.end('Server error');
        } else {
          res.writeHead(200, { 'Content-Type': 'text/plain' });
          res.end('Data written to file');
        }
      });
    });
  } else {
    res.writeHead(400, { 'Content-Type': 'text/plain' });
    res.end('Invalid request');
  }
}).listen(8080);