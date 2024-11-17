import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    status: {
        type: String,
        enum: ['TO DO', 'IN PROGRESS', 'COMPLETE'],
        default: 'TO DO',
        required: true
    },
    duration: {
        type: Number,
        default: 0,
        min: [0, 'Duration must be a positive number'],
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', 
        required: true
    }
});


const Task = mongoose.model('Task', taskSchema);

export default Task;
