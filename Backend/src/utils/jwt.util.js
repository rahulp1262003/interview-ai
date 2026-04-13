const jwt = require('jsonwebtoken');

/**
 * 
 * @param {*} user 
 * @param {*} time
 * @desc Utility function to generate a JWT token 
 * @access Public
 * @returns 
 */
module.exports._jwtGenerateToken = async (user, time) => {
    return await jwt.sign({ ...user }, process.env.JWT_SECRET_KEY, { expiresIn: time });
}