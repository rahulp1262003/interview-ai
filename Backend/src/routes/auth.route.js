const { Router } = require('express');
const authController = require('../controllers/auth.controller');
const authMiddleware = require('../middlewares/auth.middleware');

const authRouter = Router();

/** 
* @route POST /api/auth/register
* @desc Register a new user
* @access Public
*/
authRouter.post('/register', authController.registerUserController);

/**
* @route POST /api/auth/login
* @desc Login a user
* @access Public
*/
authRouter.post('/login', authController.loginUserController);

/**
* @route GET /api/auth/logout
* @desc Clear token user cookie and add token into blacklist
* @access Public
*/
authRouter.get('/logout', authController.logoutUserController);

/**
 * @rout GET /api/auth/get-me
 * @desc Get current logged in user info
 * @access Private
 */
authRouter.get('/get-me', authMiddleware.authUser, authController.getMeController);

module.exports = authRouter; 