const http = require('http');

const hostname = '0.0.0.0';
const port = 80;

var rpio = require('rpio');
rpio.open(11, rpio.INPUT);
rpio.open(12, rpio.INPUT);
var ledState11 = 0;
var ledState12 = 0;

function blinkLed(ledNum) {
	if(ledNum == 11) {
		if(ledState11 == 0)
                	setLedBright(11);
	        else
        	        setLedDark(11);
	} else {
		if(ledState12 == 0)
	                setLedBright(12);
	        else
        	        setLedDark(12);
	}
}

function setLedBright(ledNum) {
	rpio.open(ledNum, rpio.OUTPUT, rpio.HIGH);
	if(ledNum == 11) {
		ledState11 = 1;
	} else {
		ledState12 = 1;
	}
	console.log(ledNum + ' LED: HIGH');
}

function setLedDark(ledNum) {
	rpio.open(ledNum, rpio.OUTPUT, rpio.LOW);
	if(ledNum == 11)
		ledState11 = 0;
	else
		ledState12 = 0;
	//console.log(ledNum + ' LED: LOW');
}

const server = http.createServer((req, res) => {
  var html = buildHtml(req);
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end(html);
});

server.listen(port, hostname, () => {
	console.log(`Server running at http://${hostname}:${port}/`);
	var blinkInterval = setInterval(function() {blinkLed(11)}, 500);
  	var blinkInterval = setInterval(function() {blinkLed(12)}, 100);
});

function buildHtml(req) {
  var header = '';
  var body = '';

  return 'Pin 11 is currently set ' + (rpio.read(11) ? 'high' : 'low') +
	 '\nPin 12 is currently set ' + (rpio.read(12) ? 'high' : 'low');
}
