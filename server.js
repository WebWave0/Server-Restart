const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

const checkProcessRouter = require('./routes/checkProcess');

app.use('/check-process', checkProcessRouter);

app.listen(port, () => {
  console.log(`Сервер запущен на порту ${port}`);
});
