var http = require('http');
xml2js = require('xml2js');

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
    method: 'GET',
    headers: {
        'Content-Type': 'application/json', //application/json, application/xml
        'Content-Length': postData.length,
        'Accept': 'text/html'         //application/json, application/xml, text/html
    }
};

var req = http.request(options, function (res) {
    res.setEncoding('utf8');

    res.on('data', function (chunk) {
        console.log('DATA: ', chunk);
    });

    res.on('end', function () {
        
    });
});

req.on('error', function (e) {
    console.log('Problem with request:', e.message);
});

req.write(postData);
req.end();