const userModel = require('../models/user.model');
const bcrypt = require('bcryptjs');
const BlacklistTokens = require('../models/blacklist.model');
const { _jwtGenerateToken } = require('../utils/jwt.util');

/**
 * @name registerUserController
 * @desc Register a new user
 * @route POST /api/auth/register
 * @access Public
 */

const registerUserController = async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({ message: 'Please provide all required fields' });
    }

    try {
        // Check if user already exists
        const existingUser = await userModel.findOne({ $or: [{ email }, { username }] });


        if (existingUser) {
            return res.status(400).json({ message: 'User already exists with this email or username' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const newUser = new userModel({
            username,
            email,
            password: hashedPassword
        });

        await newUser.save();

        // Generate JWT token 
        // const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET_KEY, { expiresIn: '1d' });

        const token = await _jwtGenerateToken({ id: newUser._id }, '1d');

        res.cookie('token', token, { httpOnly: true });

        res.status(201).json({
            message: 'User registered successfully',
            user: {
                id: newUser._id,
                username: newUser.username,
                email: newUser.email
            }
        }
        );

    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }

};

/** 
 * @name loginUserController
 * @desc Login a user
 * @route POST /api/auth/login
 * @access Public
 */

const loginUserController = async (req, res) => {

    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Please provide all required fields' });
    }

    try {
        // Check if user exists
        const user = await userModel.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        // Check if the password is correct
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        // Generate JWT token
        const token = await _jwtGenerateToken({ id: user._id }, '1d');

        res.cookie('token', token, {
            httpOnly: true, secure: true,
            sameSite: 'none',
            maxAge: 24 * 60 * 60 * 1000
        });

        res.status(200).json({
            message: 'User logged in successfully',
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            }
        });

    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};


/**
 * @name logoutUserController
 * @desc Clear token user cookie and add token into blacklist
 * @route GET /api/auth/logout
 * @access Public
 */
const logoutUserController = async (req, res) => {
    try {

        const { token } = req.cookies;

        if (!token) {
            return res.status(400).json({ message: 'No token found' });
        }

        // Add the token to the blacklist
        if (token) {
            await BlacklistTokens.create({ token });
        }

        // Clear the token from cookie
        res.clearCookie('token');

        res.status(200).json({ message: 'User logged out successfully' });

    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};


/** * @name getMeController
 * @desc Get current logged in user info
 * @route GET /api/auth/get-me
 * @access Private
 */
const getMeController = async (req, res) => {
    try {
        const user = await userModel.findById(req.user.id);
        res.status(200).json({ message: 'User found', user });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

module.exports = {
    registerUserController,
    loginUserController,
    logoutUserController,
    getMeController
};