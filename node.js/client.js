const http = require('http');

let requestType = 'GET';

if(typeof process.argv[2] !== 'undefined' && typeof process.argv[3] !== 'undefined'){
  requestType = 'POST';
}

let options = {
  host: 'localhost',
  port: 8080,
  path: '/',
  method: requestType
};

let req = http.request(options, (resp) => {
  let data = '';

  resp.on('data', (chunk) => {
    data += chunk;
  });

  resp.on('end', () => {
    data = JSON.parse(data);
    console.log('We are the ' + data.date + ' and it is ' + data.time);
  });

}).on("error", (err) => {
  console.log("Error: " + err.message);
});

if(options.method === 'POST'){
  req.write('{\"dateFormat\": \"YYYY/MM/DD\", \"timeFormat\": \"hh:mm\"}');
}

req.end();