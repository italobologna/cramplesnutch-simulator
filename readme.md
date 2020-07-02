# Cramplesnutch Simulator

## Installation
This project runs with deno.
In order to run the project the its necessary to first install Deno on the current system.
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
Listening on port XXXX...
```

## Usage
The application will serve a configuration page on the port 4000 unless defined.
This page can be viewed by accessing the `http://localhost:4000` on the browser.
