var http = require('http');
var moment = require('moment');

const lisen_port = 8080;
let dateFormat = 'DD/MM/YYYY';
let timeFormat = 'hh:mm:ss';

http.createServer((req, res) => {
  let time;

  if(req.method === 'GET'){
    time = JSON.parse('{\"date\": \"' + moment().format(dateFormat) + '\", \"time\": \"' + moment().format(timeFormat) + '\"}');
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.write(JSON.stringify(time));    
  } else if (req.method === 'POST'){
    let data = '';

    req.on('data', (chunk) => {
      data += chunk;
    });

    req.on('end', () => {
      console.log(data);
      data = JSON.parse(data);
      console.log(data.dateFormat);
      
      time = JSON.parse('{\"date\": \"' + moment().format(data.dateFormat) + '\", \"time\": \"' + moment().format(data.timeFormat) + '\"}');

      res.writeHead(200, {'Content-Type': 'application/json'});
      res.write(JSON.stringify(time));

      res.end();
    });
  }
}).listen(lisen_port);
