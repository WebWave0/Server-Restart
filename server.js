const express = require('express');
const { exec } = require('child_process');
const pidusage = require('pidusage');

const app = express();
const port = 3000;
const workingBatPath = 'Working.bat';
const windowTitle = 'Working.bat';

// Роут для запуска проверки процессора
app.get('/run-check', async (req, res) => {
  try {
    // Получаем список процессов
    exec(`tasklist /v /fo csv`, async (error, stdout) => {
      if (error) {
        console.error(`Ошибка при получении списка процессов: ${error.message}`);
        res.status(500).send('Ошибка сервера');
        return;
      }

      // Парсим вывод команды tasklist
      const processes = stdout.split('\r\n')
        .map(line => line.trim())
        .filter(line => line !== '' && !line.startsWith('Image Name'));

      // Ищем процесс по названию окна
      const process = processes.find(line => line.includes(windowTitle));

      if (process) {
        const columns = process.split('","');
        const pid = columns[1];

        // Завершаем процесс по его PID
        exec(`taskkill /F /PID ${pid}`, (error) => {
          if (error) {
            console.error(`Ошибка при завершении процесса ${windowTitle}: ${error.message}`);
            res.status(500).send('Ошибка сервера');
          } else {
            // Запускаем процесс "Working.bat" с заданным названием окна
            exec(`start "${windowTitle}" "${workingBatPath}"`, (error) => {
              if (error) {
                console.error(`Ошибка при запуске ${workingBatPath}: ${error.message}`);
                res.status(500).send('Ошибка сервера');
              } else {
                console.log(`Процесс ${workingBatPath} перезапущен.`);
                res.send('Процесс перезапущен.');
              }
            });
          }
        });
      } else {
        // Процесс не найден, запускаем его
        exec(`start "${windowTitle}" "${workingBatPath}"`, (error) => {
          if (error) {
            console.error(`Ошибка при запуске ${workingBatPath}: ${error.message}`);
            res.status(500).send('Ошибка сервера');
          } else {
            console.log(`Процесс ${workingBatPath} запущен.`);
            res.send('Процесс запущен.');
          }
        });
      }
    });
  } catch (error) {
    console.error(`Ошибка при выполнении запроса: ${error}`);
    res.status(500).send('Ошибка сервера');
  }
});

// Запуск сервера
app.listen(port, () => {
  console.log(`Сервер запущен на порту ${port}`);
});
