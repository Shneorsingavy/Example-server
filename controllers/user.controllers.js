import User from '../models/user.schema.js';
import bcrypt from 'bcrypt';
import { buildResponse } from "../utils/helper.js";
import { createToken } from '../utils/helper.js';


let response = '';

//create user
export const createUser = async (req, res) => {
    const { username, password, email } = req.body;

    if (!username || !password || !email) {
         response = buildResponse(false, 'All fields are required!', null);
        return res.status(400).json(response);
    }

    try {
        const existingUser = await User.findOne( { email } );
        if (existingUser) {
             response = buildResponse(false, 'User already exists!', null);
            return res.status(400).json(response);
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            username,
            password: hashedPassword,
            email,
        });

        await newUser.save();

         response = buildResponse(true, 'User created successfully!', newUser);
        res.status(201).json(response); 

    } catch (err) {
         response = buildResponse(false, 'Failed to create user', null);
        res.status(500).json(response);
    }
};

//Log in
export const logIn = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
             response = buildResponse(false, 'The user does NOT exist', null);
            res.status(401).json(response);
            return;
        };
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            response = buildResponse(false, 'Invalid credentials', null);
            res.status(401).json(response);
            return;
        };
        const token = createToken(user._id);
        res.cookie('token', token, {
            httpOnly: true,
            maxAge: 60 * 60 * 1000
        });
        response = buildResponse(true, 'Login successful', user);
        res.status(200).json(response);
    } catch (err) {
        response = buildResponse(false, 'Failed to login', null);
        res.status(500).json(response);
    };
};
