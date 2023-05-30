# OBJECT DETECTION SYSTEM FOR SMART DEVICES

This Project shows how to combine Arduino along with sensors to detect if an object is present or not inside its range, and how this information can be passed to NodeJS running in a Raspberry Pi/Ubuntu which calls a PHP backend API and finally updating a MariaDB database.

![Front View](https://github.com/neolink3891/Full-Object-Detection-System/blob/master/IMAGES/front.jpeg?raw=true)

By combining different technologies it is possible to detect and update any backend server.


## Contents:
* ARDUINO-CODE: Code executed in an Arduino Mega controling sensors (Ultrasonic Sensor, Push Button, Electromagnetic Locks, LEDs) and comunnicating via Serial Port with NodeJS.
* BACKEND-API-PHP: MVC PHP Code processing API calls.
* MIDDLEWARE-NODEJS: NodeJS application that shows a webpage to the user, communicates with Arduino via Serial port, and makes API calls.
* DATABASE-SCRIPTS: Table and Stored Procedured for Data storaging.

![Full Process](https://github.com/neolink3891/Full-Object-Detection-System/blob/master/IMAGES/process.png?raw=true)

## Elements

The system contains the following elements:

### Arduino

Arduino controls sensors and sends/receives instructions from NodeJS.

![Sensors](https://github.com/neolink3891/Full-Object-Detection-System/blob/master/IMAGES/sensor_view.jpeg?raw=true)

### Middleware - NodeJS

This is a NodeJS application that runs in a Raspberry Pi with Ubuntu. A webpage is serve directly to a touchscreen display and allows users to interact with the device.


### PHP Backend API

Hosted in a AWS CentOS Server, it receives calls from NodeJS with two values: Door Number and Action. Then it calls a Stored Procedured in a Database.


### MariaDB Database

This storages data, in this example there is one singe Table, with few fields just to update what is the status of the container: EMPTY or NOT.

![Circuit](https://github.com/neolink3891/Full-Object-Detection-System/blob/master/IMAGES/upper_view.jpeg?raw=true)