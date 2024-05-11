const mongoose = require('mongoose')

const SiteDetails = new mongoose.Schema({
    site: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
        trim: true,
    },
    sitePassword: {
        type: String,
        required: true,
    }
},
    { timestamps: true }
);

module.exports = mongoose.model('SiteDetails', SiteDetails);