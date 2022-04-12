const express = require('express');
const router = express.Router();

const Todo = require('../models/todo');

// return all todos
router.get('/', async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (error) {
    console.log(error);
  }
});

// return todo by id
router.get('/:id', async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    res.json(todo);
  } catch (error) {
    console.log(error);
  }
});

// create todo
router.post('/', async (req, res) => {
  try {
    const { title, description } = req.body;
    const todo = new Todo({title, description});
    console.log(todo);
    await todo.save();
    res.json({
      status:"Todo saved"
    })
  } catch (error) {
    console.log(error);
  }
});

// update todo by id
router.put('/:id', async (req, res) => {
  try {
    const { title, description } = req.body;
    const newTodo = { title, description };
    await Todo.findByIdAndUpdate(req.params.id, newTodo);
    res.json({
      status:"Todo updated"
    })
  } catch (error) {
    console.log(error);
  }
});

// delete todo by id
router.delete('/:id', async (req, res) => {
  try {
    await Todo.findByIdAndRemove(req.params.id);
    res.json({
      status:"Todo deleted"
    })
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
