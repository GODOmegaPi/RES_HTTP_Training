const http = require('http');

let requestType = 'GET';
let format = '';

if(typeof process.argv[2] !== 'undefined' && typeof process.argv[3] !== 'undefined'){
  requestType = 'POST';
  format = 'dateFormat=YYYY&timeFormat=hh:mm';
}

let options = {
  host: 'localhost',
  port: 8080,
  path: '/' + format,
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

req.end();