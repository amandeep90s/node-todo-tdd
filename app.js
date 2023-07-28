const express = require('express');
const mongodb = require('./mongodb/mongodb.connect');
const todoRoutes = require('./routes/todo.routes');

const app = express();

mongodb.connect();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use('/todos', todoRoutes);

app.get('/', (req, res, next) => {
  res.json({ data: 'Hello world' });
});

// app.listen(3000, () => {
//   console.log('App is running on http://localhost:3000');
// });

module.exports = app;
