import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors'
import todoController from './controllers/todoController.js';
import connectDb from './config/db.js';

dotenv.config();
connectDb();

const App = express();

App.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));
App.use(express.json());


App.use('/api/todos', todoController);
App.get('/', (req, res) => {
    res.send("API is running")
})

export default App;

const PORT = process.env.PORT || 5000;
if (process.env.NODE_ENV !== 'production') {
    App.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    })
}
