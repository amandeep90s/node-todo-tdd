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

/**
 * Update Todo by id
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @return {Promise}
 */
const updateTodo = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedTodo = await TodoModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!updatedTodo) {
      return res.status(404).json({ message: 'Not Found' });
    }
    res.status(200).json(updatedTodo);
  } catch (error) {
    next(error);
  }
};

const deleteTodo = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedTodo = await TodoModel.findByIdAndDelete(id);
    if (!deletedTodo) {
      return res.status(404).json({ message: 'Not Found' });
    }
    res.status(201).json({ message: 'Successfully deleted' });
  } catch (error) {
    next(error);
  }
};

module.exports = { createTodo, getTodos, getTodoById, updateTodo, deleteTodo };
