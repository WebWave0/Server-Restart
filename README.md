# Server-Restart
A script that, when sending a request to a local server, reloads a specific .bat file, if there is no such file, the script itself runs it.
To run the script you need to download all the dependencies using the npm install command. After successfully installing the dependencies, go to the root folder of the project and run the command node server.js. By default the server will listen to port 3000, but you can change this port in the settings. The server will be available at http://localhost:3000/run-check.
