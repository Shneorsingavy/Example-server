import Task from "../models/task.schema.js";
import { buildResponse } from "../utils/helper.js";

let response = ''; 

// add task
export const addTask = async (req, res) => {
    const { name, description, status, duration, userId } = req.body;
    

    if (!name || !description || !status || !duration || !userId) {
        response = buildResponse(false, 'All fields must be valid!', null);
        return res.status(400).send(response);
    }

    try {
        const newTask = await Task.create({
            name,
            description,
            status,
            duration,
            userId,
        });
        console.log(newTask);
        

        response = buildResponse(true, "Task created successfully!", newTask);
        res.status(201).send(response); 
    } catch (err) {
        response = buildResponse(false, 'Failed to create task', err);
        res.status(500).json(response);
    }
};

// get all tasks
export const getAllTask = async (_, res) => {
    try {
        const tasksList = await Task.find();

        if (!tasksList || tasksList.length === 0) {
            response = buildResponse(false, 'Failed to load tasks', null);
            return res.status(404).json(response);
        }

        response = buildResponse(true, 'Fetched all tasks successfully', tasksList);
        res.status(200).json(response);
    } catch (error) {
        response = buildResponse(false, 'Failed to load tasks', null);
        res.status(500).json(response);
    }
};

// update task
export const updateTask = async (req, res) => {
    const taskId = req.params.id;
    const taskData = req.body;

    try {
        const updatedTask = await Task.findByIdAndUpdate(taskId, taskData, { new: true });

        if (!updatedTask) {
            response = buildResponse(false, 'Failed to find task', null);
            return res.status(404).json(response);
        }

        response = buildResponse(true, 'Task update succeeded', updatedTask);
        res.status(200).json(response);
    } catch (err) {
        response = buildResponse(false, 'Failed to load task', err);
        res.status(500).json(response);
    }
};

// delete a task
export const deleteTask = async (req, res) => {
    const taskId = req.params.id;

    try {
        const deletedTask = await Task.findByIdAndDelete(taskId);

        if (!deletedTask) {
            response = buildResponse(false, 'Failed to find task', null);
            return res.status(404).json(response);
        }

        response = buildResponse(true, 'Task deleted successfully', deletedTask);
        res.status(200).json(response);
    } catch (err) {
        response = buildResponse(false, 'Failed to delete task', err);
        res.status(500).json(response);
    }
};
