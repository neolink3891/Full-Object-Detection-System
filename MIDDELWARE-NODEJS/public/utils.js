const enablenotif = "0";
var pin = "";
var hpin = "";
var phidden = true;
        
function hideDiv(item, nitem) {
    document.getElementById(item).style.visibility = 'hidden';
    document.getElementById(nitem).style.visibility = 'visible';
    document.getElementById('pqp_mes').innerHTML = "";
    document.getElementById('pqp_wait').style.visibility = 'hidden';
    pin = "";
    hpin = "";
    phidden = true;
}

function centerKeypad() {
    var dw = document.getElementById('pqp_keypad').clientWidth;
    var dh = document.getElementById('pqp_keypad').clientHeight;
    var kw = document.getElementById('pqp_keys').clientWidth;
    var kh = document.getElementById('pqp_keys').clientHeight;
    var mw = document.getElementById('pqp_message').clientWidth;
    var mh = document.getElementById('pqp_message').clientHeight;
    var mpw = dw / 2;
    var mph = dh / 2;
    var skp = mpw - (kw / 2);
    var skh = mph - (kh / 2);
            
    document.getElementById('pqp_keys').style.left = skp;
    document.getElementById('pqp_keys').style.top = skh;
    document.getElementById('pqp_loading').style.left = (mpw - 50);
    document.getElementById('pqp_loading').style.top = (mph - 50);
    document.getElementById('pqp_innermessage').style.left = skp;
    document.getElementById('pqp_innermessage').style.top = skh;
            
    document.getElementById('pqp_loading').style.visibility = 'hidden';
}

function buildPin(num) {
    if(pin.length < 4) {
        pin += num;
        hpin += "*";
            
        displayPin();
    } else {
        document.getElementById('pqp_mes').innerHTML = "Your PIN must be 4 digits long.";
    }
}

function displayPin() {
    if(phidden) {
        document.getElementById('pqp_pin').innerHTML = hpin;
    } else {
        document.getElementById('pqp_pin').innerHTML = pin;
    }
}

function tooglePinVisibility() {
    if(phidden) {
        phidden = false;
        document.getElementById('pqp_togglepin').src = '/pqp_pon.png';
    } else {
        phidden = true;
        document.getElementById('pqp_togglepin').src = '/pqp_poff.png';
    }
    displayPin();
}

function deleteLast() {
    pin = pin.substring(0, pin.length - 1);
    hpin = hpin.substring(0, hpin.length - 1);
            
    displayPin();
}

function clearPin() {
    var cpin = document.getElementById('pqp_pin').innerHTML;
    if(cpin.length > 0) {
        pin = "";
        hpin = "";
        document.getElementById('pqp_pin').innerHTML = "";
    } else {
        document.getElementById('pqp_intro').style.visibility = 'visible';
        document.getElementById('pqp_keypad').style.visibility = 'hidden';
    }
}

function goForPIN() {
    if(pin == "0911") {
        openDoor("0-OPEN");
    } else if (pin == "2707") {
         openDoor("1-OPEN")
    } else {
        document.getElementById('pqp_mes').innerHTML = "PIN not recognized";
    }
}

function openDoor(signal) {
    window.location.href = "http://localhost:3030/open/msg:" + signal;
}