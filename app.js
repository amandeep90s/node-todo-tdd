const express = require('express');
const todoRoutes = require('./routes/todo.routes');

const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use('/todos', todoRoutes);

app.get('/', (req, res, next) => {
  res.send('<h1>Hello world</h1>');
});

app.listen(3000, () => {
  console.log('App is running on http://localhost:3000');
});

module.exports = app;
