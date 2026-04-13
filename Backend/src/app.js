const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const authRoutes = require('./routes/auth.route');
const interviewRoutes = require('./routes/interview.route');

const app = express();


app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));
app.use(cookieParser());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/interview', interviewRoutes);

module.exports = app;