# Cramplesnutch Simulator

## Description
This project sets a user configured accessible HTTP route which will produce a 
pre-defined user configured response, allowing an optional TCP data exchange between
this application and an external application.

The usual operation will follow the sequence:
1. Application listens to an HTTP request on a specified path;
2. Upon receiving the HTTP request, this application will send 
a TCP packet to an external application; 
3. Upon receiving the TCP response packet, 
the application will respond the HTTP request with the defined response.


## Installation
This project runs with Deno. In order to run the project the its necessary to first install 
Deno on the current system.
For installing on Windows platforms, the following command might be used:

```powershell
# Run as administrator:
$env:DENO_INSTALL = "C:\Program Files\deno"
iwr https://deno.land/x/install/install.ps1 -useb | iex
```

More information about its installation, or installations on other systems can be found 
[here](https://deno.land/x/install/).

## Running
The application can be run with the run.bat command on Windows platforms.
This script will run the Deno application with the proper necessary configurations.

In case necessary, or in another operating system, the following command might 
be used on the project root folder in order to run the application.

```shell script
deno run --allow-net --allow-env --allow-run --allow-read app.ts
``` 

By running the application successfully, the following command line information will be displayed.

```shell script
...
Listening on port {port}...
```

## Usage
The application will serve a configuration page which all the usage configuration will be made.
This page can be viewed by accessing the URL `http://localhost:{port}` on the browser. 

By default application runs by default on the port 4000.  
