const express = require('express');
const { exec } = require('child_process');

const router = express.Router();

const processName = 'Working.bat';

function checkProcessRunning(callback) {
  const tasklistCommand = `tasklist /FI "IMAGENAME eq ${processName}"`;
  exec(tasklistCommand, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error while checking if ${processName} is running: ${error}`);
      callback(false);
      return;
    }
    const processRunning = stdout.toLowerCase().indexOf(processName.toLowerCase()) > -1;
    callback(processRunning);
  });
}

router.get('/', (req, res) => {
  checkProcessRunning((isRunning) => {
    if (isRunning) {
      const killCommand = `taskkill /F /IM ${processName}`;
      exec(killCommand, (error, stdout, stderr) => {
        if (error) {
          console.error(`Error while stopping ${processName}: ${error}`);
          res.status(500).send(`Error while stopping ${processName}`);
          return;
        }
        console.log(`Stopped ${processName}`);
        startProcess(res);
      });
    } else {
      startProcess(res);
    }
  });
});

function startProcess(res) {
  const startCommand = `start ${processName}`;
  exec(startCommand, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error while starting ${processName}: ${error}`);
      res.status(500).send(`Error while starting ${processName}`);
      return;
    }
    console.log(`Started ${processName}`);
    res.status(200).send(`Successfully started ${processName}`);
  });
}

module.exports = router;