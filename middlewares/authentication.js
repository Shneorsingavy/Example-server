import jwt from 'jsonwebtoken';
import { buildResponse } from '../utils/helper.js';


export const authMiddleware = (req, res, next) => {

    const token = req.cookies['token'];

    if (!token) {
        const response = buildResponse(
            false, 'No token in the request', null, 'Failed to load a token', null,
        );
        res.status(403).json(response);
        return;
    };

    try {
        const { id } = jwt.verify(token, process.env.JWT_SECRET);
        req.body.USER_ID = id;
        
        next();

    } catch (err) {
        const response = buildResponse(
            false, 'Invalid token', null, 'Failed to verify token', null,
        );
        
        res.status(401).json(response);
        return;
    };
};