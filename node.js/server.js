var http = require('http');
var moment = require('moment');

const lisen_port = 8080;
let dateFormat = 'DD/MM/YYYY';
let timeFormat = 'hh:mm:ss';

http.createServer((req, res) => {
  let data = '';

  req.on('data', (chunk) => {
    data += chunk;
  });

  req.on('end', () => {
    console.log(data);
    data = JSON.parse(data);

    let time;
    switch(req.method){
      case 'POST': 
        time = JSON.parse('{\"date\": \"' + moment().format(data.dateFormat) + '\", \"time\": \"' + moment().format(data.timeFormat) + '\"}');
        break;
      default:
        time = JSON.parse('{\"date\": \"' + moment().format(dateFormat) + '\", \"time\": \"' + moment().format(timeFormat) + '\"}');
        break;
    }

    res.writeHead(200, {'Content-Type': 'application/json'});
    res.write(JSON.stringify(time));

    console.log(JSON.stringify(time));

    res.end();
  });
}).listen(lisen_port);
