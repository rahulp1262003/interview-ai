const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: [true, 'Email already exists']
    },
    password: {
        type: String,
        required: true
    }
}, { timestamps: true });

const UserModel = mongoose.model('Users', userSchema);

module.exports = UserModel;