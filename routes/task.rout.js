import express from "express";
import { addTask, getAllTask, updateTask, deleteTask } from '../controllers/task.controllers.js';


const taskRouter = express.Router();


taskRouter.post('/addTask', addTask);
taskRouter.get('/getAllTask', getAllTask);
taskRouter.put('/updateTask/:id', updateTask);
taskRouter.post('/deleteTask/:id', deleteTask);



export default taskRouter;