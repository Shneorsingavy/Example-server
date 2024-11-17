import express from "express";
import { logIn, createUser } from "../controllers/user.controllers.js";
import {authMiddleware} from '../middlewares/authentication.js';

const userRouter = express.Router();


userRouter.post('/createUser', createUser);
userRouter.post('/logIn', logIn);

userRouter.use(authMiddleware);


export default userRouter;