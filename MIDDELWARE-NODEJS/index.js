const express = require('express');
const XMLHttpRequest = require('xhr2');
const app = express();
const path = require('path');
const router = express.Router();
const SerialPort = require('serialport');
const { ReadlineParser } = require('@serialport/parser-readline');
const port = new SerialPort('/dev/ttyACM0', { baudRate: 9600 }).setEncoding('utf-8');
const parser = port.pipe(new ReadlineParser({delimiter: '\n'}));

process.env.PWD = process.cwd();

app.use(express.static(process.env.PWD + '/public'));

parser.on('data', data =>{
  cds = data.toString().trim();
  if(cds.substring(0,2) == "dn"){
    updateStatus(cds);
  }
});

router.get('/', function(req, res) {
  res.sendFile(path.join(__dirname + '/main.html'));
});

router.get('/open/:msg', function(req, res) {
  let purifyString = req.params.msg.replace("msg:", "");
  port.write(purifyString + '\n');
  res.sendFile(path.join(__dirname + '/thanks.html'));
});

function updateStatus(command) {
  var xhttp = new XMLHttpRequest();

  xhttp.open("POST", "http://ec2-52-23-130-105.compute-1.amazonaws.com/lns/core.php?requested=unids&" + command, true);
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhttp.send("v1=0");
}

app.use('/', router);
app.listen(process.env.port || 3030);

console.log('Interface Running on Port 3030');
