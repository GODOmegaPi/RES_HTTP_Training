var http = require('http');

const lisen_port = 8080;

http.createServer(function (req, res) {
  console.log("client connected");
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.write(req.url);
  res.end();
}).listen(lisen_port);
