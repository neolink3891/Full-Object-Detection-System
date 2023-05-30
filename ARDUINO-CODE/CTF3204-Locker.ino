//NeoLink - 2023
#include <SoftwareSerial.h>
#define p14 A0
#define p15 A1

int trgPins[2] = {4,5};
int echPins[2] = {2,3};
int pshPins[2] = {6,7};
int bluPins[2] = {8,9};
int grePins[2] = {10,11};
int yelPins[2] = {12,13};
int relPins[2] = {p14, p15};
int distance;
long duration;
int btnState = 0;
int btnDetected = 0;
char receivedChar;
boolean newCommand = false;
String cmd = "";
String dn = "";
int doorNumber;
int cmdType = 0;
String cmdBack = "";

void setup() {
  Serial.begin(9600);

  for(int t = 0; t < 2; t++) {
    pinMode(trgPins[t], OUTPUT);
    pinMode(echPins[t], INPUT);
    pinMode(pshPins[t], INPUT);
    pinMode(bluPins[t], OUTPUT);
    pinMode(grePins[t], OUTPUT);
    pinMode(yelPins[t], OUTPUT);
    pinMode(relPins[t], OUTPUT);
  }

  setDoor(0);
  setDoor(1);
}

void loop() {
  checkButton(0);
  incommingSerialParser();
}

void setDoor(int d) {
  engageDoor(d, "CLOSED");
}

void setLight(int d, String col) {
  digitalWrite(grePins[d], LOW);
  digitalWrite(bluPins[d], LOW);
  digitalWrite(yelPins[d], LOW);
  if(col == "GREEN") {
    digitalWrite(grePins[d], HIGH);
  } else if (col == "BLUE") {
    digitalWrite(bluPins[d], HIGH);
  } else {
    digitalWrite(yelPins[d], HIGH);
  }
}

void engageDoor(int d, String dir) {
  if(dir == "OPEN") {
    digitalWrite(relPins[d], LOW);
  } else {
    digitalWrite(relPins[d], HIGH);
  }
}

void checkButton(int d) {
  btnState = digitalRead(pshPins[d]);
  if(btnState == HIGH) {
    if(btnDetected == 0) {
      engageDoor(d, "CLOSED");
      checkDistance(d);
      btnDetected = 1;
    }
  } else {
    if(btnDetected == 1) {
      btnDetected = 0;
    }
  }
}

void checkDistance(int d) {
  digitalWrite(trgPins[d], LOW);
  delayMicroseconds(2);
  digitalWrite(trgPins[d], HIGH);
  delayMicroseconds(10);
  digitalWrite(trgPins[d], LOW);

  duration = pulseIn(echPins[d], HIGH);
  distance = (duration * 0.034) / 2;

  if(distance <= 23) {
    setLight(d, "GREEN");
    cmdBack = "dn=" + String(d) + "&ie=0" + '\n';
    Serial.println(cmdBack);
  } else {
    setLight(d, "BLUE");
    cmdBack = "dn=" + String(d) + "&ie=1" + '\n';
    Serial.println(cmdBack);
  }
}

void sendCmd(String commandToSend) {
  for(int i = 0; i < commandToSend.length(); i++) {
    Serial.write(commandToSend[i]);
  }
}

void incommingSerialParser() {
  if (Serial.available() > 0) {
    receivedChar = Serial.read();
    if(receivedChar == '\n') {
      newCommand = true;
      executeCommand(doorNumber, cmd);
    } else if (receivedChar == '-') {
      cmdType = 1;
      doorNumber = dn.toInt();
      dn = "";
    } else {
      if(cmdType == 0) {
        dn = dn + receivedChar;
      } else {
        cmd = cmd + receivedChar;
      }
    }
  }
}
void executeCommand(int d, String c) {
  if(c == "OPEN") {
    engageDoor(d, "OPEN");
    setLight(d, "RED");
  }
}

void displayCommand() {
  Serial.println("Data:");
  Serial.print("Door: ");
  Serial.println(doorNumber);
  Serial.print("Command: ");
  Serial.println(cmd);
  cmd = "";
  newCommand = false;
}
