const express = require('express');
const reloadRoute = require('./routes/reload');
const { exec } = require('child_process');

const app = express();
const port = 3000;

app.use('/reload', reloadRoute);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

// Обработка события завершения сервера
process.on('SIGINT', () => {
  // Завершаем процесс "Working.bat", если он запущен
  const processName = 'Working.bat';
  const killCommand = `taskkill /F /IM ${processName}`;
  exec(killCommand, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error while stopping ${processName}: ${error}`);
      return;
    }
    console.log(`Stopped ${processName}`);
    process.exit(); // Завершаем процесс сервера
  });
});