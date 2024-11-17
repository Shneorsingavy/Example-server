import rateLimit from 'express-rate-limit';

export const buildResponse = (
    isSuccessful = false,
    displayMessage = 'Unknown message',
    data = null
) => {
    return {
        isSuccessful,
        displayMessage,
        data,
    };
};


export const createToken = (id) => {

    const token = jwt.sign({ id: id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    return token;
};


export const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: 'Too many requests from this IP, please try again after 15 minutes',
});