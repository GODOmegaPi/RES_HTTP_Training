const http = require('http');
const xml2js = require('xml2js');

var postData = {time: {
    hour: 8,
    minute: 0,
    second: 0
}};

//postData = JSON.stringify(postData);

var builder = new xml2js.Builder();
postData = builder.buildObject(postData);

var options = {
    hostname: 'localhost',
    port: 8080,
    method: 'POST',
    headers: {
        //application/json, application/xml
        'Content-Type': 'application/xml',

        'Content-Length': postData.length,

        //application/json, application/xml, text/html
        'Accept': 'text/html'
    }
};

var req = http.request(options, (res) => {
    res.setEncoding('utf8');

    res.on('data', (chunk) => {
        console.log('DATA: ', chunk);
    });

    res.on('end', () => {
        
    });
});

req.on('error', (e) => {
    console.log('Problem with request:', e.message);
});

req.write(postData);
req.end();