const http = require('http');
const fs = require('fs');

http.createServer(function(req, res) {
  if (req.method === 'POST') {
    let body = '';

    req.on('data', function(data) {
      body += data;
    });

    req.on('end', function() {
      fs.writeFile('data.txt', body, function(err) {
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
    // Changed to return error code 405 Method Not Allowed instead of 400 Bad Request
    res.writeHead(405, { 'Content-Type': 'text/plain', 'Allow': 'POST' });
    res.end('Method not allowed');
  }
}).listen(8080);