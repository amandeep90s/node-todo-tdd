const TodoModel = require('../models/todo.model');

/**
 * Create a new Todo
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @return {Promise}
 */
const createTodo = async (req, res, next) => {
  try {
    const createModel = await TodoModel.create(req.body);
    res.status(201).json(createModel);
  } catch (error) {
    next(error);
  }
};

/**
 * Get all Todos list
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @return {Promise}
 */
const getTodos = async (req, res, next) => {
  try {
    const allTodos = await TodoModel.find({});
    res.status(200).json(allTodos);
  } catch (error) {
    next(error);
  }
};

/**
 * Get Todo by id
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @return {Promise}
 */
const getTodoById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const todo = await TodoModel.findById(id);
    if (!todo) {
      return res.status(404).json({ message: 'Not Found' });
    }
    res.status(200).json(todo);
  } catch (error) {
    next(error);
  }
};

module.exports = { createTodo, getTodos, getTodoById };
