const http = require('http');

const options = {
  host: '127.0.0.1',
  port: 8080,
  method: 'GET'
};

http.request(options, (resp) => {
  let data = '';

  resp.on('data', (chunk) => {
    console.log(chunk);
    data += chunk;
  });

  resp.on('end', () => {
    console.log(data);
  });

}).on("error", (err) => {
  console.log("Error: " + err.message);
});
