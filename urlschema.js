const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
    'endUrl':{
        type: String,
        required: true
    },
    'shortUrl':{
        type: String, 
        required: true
    },
    'timestamp': {
        type: Date,
        required: true,
        default: Date.now
    },
    'owner':{
        type: String,
        required: true,
        default: 'guest'
    }

});

module.exports = mongoose.model('url', urlSchema)