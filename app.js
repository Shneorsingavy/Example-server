import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import taskRouter from './routes/task.rout.js';
import { limiter } from './utils/helper.js';
import userRouter from './routes/user.rout.js';
import { authMiddleware } from './middlewares/authentication.js';

import('./DBconnect/DBconnect.js');

const app = express();
const PORT = 3000;



app.use(cors({
    origin: '*', 
    credentials: true,
  }));

app.use(limiter);

app.use(express.json());
app.use(cookieParser());

app.use('/user', userRouter);

app.use(authMiddleware);
app.use('/task', taskRouter);




app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});