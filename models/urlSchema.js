const mongoose = require('mongoose');
const beautifyUnique = require('mongoose-beautiful-unique-validation');
// Enable beautifying on this schema

// TODO: implement url validation
const urlSchema = new mongoose.Schema({
    'endUrl':{
        type: String,
        required: true,
        unique: true,
        trim: true,
        validate(value) {
            // implement url validation
            return true;
        }
    },
    'shortUrl':{
        type: String, 
        required: true,
        trim: true,
        validate(value) {
            // implement url validation
            return true;
        }
    },
    'timestamp': {
        type: Date,
        required: true,
        default: Date.now()
    },
    'owner':{
        type: String,
        required: true,
        default: 'guest'
    }

});
urlSchema.plugin(beautifyUnique);
module.exports = mongoose.model('url', urlSchema);