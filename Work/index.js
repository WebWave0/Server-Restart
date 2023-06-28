const express = require('express');
const reloadRoute = require('./routes/reload');
const { exec } = require('child_process');

const app = express();
const port = 3000;

app.use('/reload', reloadRoute);

// SSE route for console output
app.get('/reload', (req, res) => {
  res.setHeader('Content-Type', 'text/html');

  // Function to send console output to the response
  const sendConsoleOutput = (data) => {
    res.write(`<pre>${data}</pre>`);
  };

  // Execute the process and send output to the response
  const processName = 'Working.bat';
  const startCommand = `start ${processName}`;
  const process = exec(startCommand);

  process.stdout.on('data', (data) => {
    sendConsoleOutput(data.toString().trim());
  });

  process.stderr.on('data', (data) => {
    sendConsoleOutput(data.toString().trim());
  });

  // Handle process exit
  process.on('exit', (code) => {
    sendConsoleOutput(`Process exited with code: ${code}`);
    res.end();
  });

  // Handle request interruption
  req.on('close', () => {
    process.kill();
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
