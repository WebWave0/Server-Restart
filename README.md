# Server-Restart
A script that, when sending a request to the local server, reloads a specific .bat file, if there is no such file, the script itself runs it.
In order to run the script it is necessary to load all the dependencies with the command npm install. After successfully installing the dependencies go to the root folder of the project and run the command node server.js. By default the server will listen to port 3000, but you can change this port in the settings in the cfg.ini file. The server will be available at http://localhost:3000/check-process.
