const http = require('http');
const xml2js = require('xml2js')
const parseString = xml2js.parseString;

let server = http.createServer().listen(8080);

server.on('request', function (req, res) {
    if (req.method == 'POST') {
        var body = '';
    }

    req.on('data', function (data) {
        body += data;
    });

    req.on('end', function () {
        if (req.method == 'POST') {
            if(req.headers['content-type'] == 'application/json'){
                var post = JSON.parse(body);
                clock.setTime(post.time.hour, post.time.minute, post.time.second);
            } else if (req.headers['content-type'] == 'application/xml'){
                var post;
                parseString(body, function (err, result) {
                    post = result;
                });
                clock.setTime(post.time.hour, post.time.minute, post.time.second);
            }
        }

        if(req.headers['content-type'] == 'application/json'){
            res.writeHead(200, {'Content-Type': 'application/json'});
            res.end(JSON.stringify({time: clock.time}));
        } else if (req.headers['content-type'] == 'application/xml'){
            res.writeHead(200, {'Content-Type': 'application/xml'});
            var builder = new xml2js.Builder();
            res.end(builder.buildObject({time: clock.time}));
        }
    });
});

class Clock{
    constructor(hour, minute, second){
        this.hour = hour;
        this.minute = minute;
        this.second = second;
    }

    update() {
        this.second++;

        if(this.second >= 60){
            this.second = 0;
            this.minute++;
        }
        if(this.minute >= 60){
            this.minute = 0;
            this.hour++;
        }
        if(this.hour >= 24){
            this.hour = 0;
        }

        console.clear();
        console.log(this.hour + ':' + this.minute + ':' + this.second);
    }

    setTime(hour, minute, second){
        this.hour = hour;
        this.minute = minute;
        this.second = second;

        console.clear();
        console.log(this.hour + ':' + this.minute + ':' + this.second);
    }

    get time(){
        return {hour: this.hour, minute: this.minute, second: this.second};
    }
}

let clock = new Clock(0, 0, 0);

setInterval(() => {clock.update();}, 1000);