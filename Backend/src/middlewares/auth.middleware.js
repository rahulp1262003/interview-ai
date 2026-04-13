const jwt = require('jsonwebtoken');
const BlacklistTokens = require('../models/blacklist.model');
/**
 * @name authUserMiddleware
 * @desc Middleware to authenticate user using JWT token from cookies
 * @access Private
 */

const authUser = async (req, res, next) => {
    const { token } = req.cookies;
    if (!token) {
        return res.status(401).json({ message: 'No token found, authorization denied' });
    }

    const isBlacklisted = await BlacklistTokens.findOne({ token });

    if (isBlacklisted) {
        return res.status(401).json({ message: 'Token is Invalid, authorization denied' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Invalid token, authorization denied' });
    }
};

module.exports = { authUser };