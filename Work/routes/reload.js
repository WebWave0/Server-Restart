const express = require('express');
const { exec } = require('child_process');

const router = express.Router();

const processName = 'Working.bat';

function killProcess(callback) {
  const killCommand = `python kill_process.py ${processName}`;
  exec(killCommand, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error while stopping ${processName}: ${error}`);
      callback(false);
      return;
    }
    console.log(`Stopped ${processName}`);
    callback(true);
  });
}

router.get('/', (req, res) => {
  killProcess((killed) => {
    if (killed) {
      startProcess(res);
    } else {
      res.status(200).send(`Process ${processName} not found.`);
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
