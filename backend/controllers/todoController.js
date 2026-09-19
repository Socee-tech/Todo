import express from 'express';
import Todo from '../models/todo.js';

const Router = express.Router();

// Add a new todo
Router.post('/', async (req, res) => {
    try {
        const { title, description, status} = req.body;
        if (!title) {
            return res.status(400).json({ message: 'Title is required'});
        }

        const newTodo = new Todo({ title, description, status});
        const savedTodo = await newTodo.save();
        res.status(201).json(savedTodo);
    } catch (error) {
        res.status(500).json({ message: 'Failed to create todo', error: error.message });
    }
})

// Get all todos
Router.get('/', async (req, res) => {
    try {
        const todos = await Todo.find();
        res.status(200).json(todos);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch todos', error: error.message });
    }
})

// Update a todo
Router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, status } = req.body;
        const updatedTodo = await Todo.findByIdAndUpdate(
            id, { title, description, status }, { new: true }
        )
        if (!updatedTodo) {
            return res.status(404).json({ message: 'Todo not found' });
        }
        res.status(200).json(updatedTodo);
    } catch (error) {
        res.status(500).json({ message: 'Failed to update todo', error: error.message});
    }
})

// Delete a todo
Router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deletedTodo = await Todo.findByIdAndDelete(id);
        if (!deletedTodo) {
            return res.status(404).json({ message: 'Todo not found' });
        }
        res.status(200).json({ message: 'Todo deleted successfullt' });
    } catch (error) {
        return res.status(500).json({ message: 'Failed to delete todo', error: error.message });
    }
})

export default Router;