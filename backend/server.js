import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors'
import todoController from './controllers/todoController.js';
import connectDb from './config/db.js';

dotenv.config();
connectDb();

const App = express();

App.use(cors());
App.use(express.json());


App.use('/api/todos', todoController);
App.get('/', (req, res) => {
    res.send("API is running")
})

const PORT = process.env.PORT || 5000;
App.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})
