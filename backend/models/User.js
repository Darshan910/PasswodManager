const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    firstName: {
        type: String,
        required: true,
        trim: true,
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    siteInformation: [{
        id: {
            type: mongoose.Schema.Types.ObjectId,
            required: true
        },
        site: String,
        username: String,
        sitePassword: String,
    }]
},
    { timestamps: true }
);

module.exports = mongoose.model('User', UserSchema);