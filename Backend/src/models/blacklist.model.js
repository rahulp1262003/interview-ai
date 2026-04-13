const mongoose = require('mongoose');

const blacklistTokenSchema = new mongoose.Schema({
    token: {
        type: String,
        required: [true, 'Token is required to add into blacklist'],
    },
}, { timestamps: true });

module.exports = mongoose.model('BlacklistTokens', blacklistTokenSchema);