const TodoModel = require('../models/todo.model');

const createTodo = () => {
  TodoModel.create();
};

module.exports = { createTodo };
