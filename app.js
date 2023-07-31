const express = require('express');
const mongodb = require('./mongodb/mongodb.connect');
const todoRoutes = require('./routes/todo.routes');

const app = express();

mongodb.connect();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use('/todos', todoRoutes);

app.use((error, req, res, next) => {
  res.status(500).json({ message: error.message });
});

app.get('/', (req, res, next) => {
  res.json({ data: 'Hello world' });
});

module.exports = app;
