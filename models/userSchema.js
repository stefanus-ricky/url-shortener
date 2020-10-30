const mongoose = require('mongoose');
const beautifyUnique = require('mongoose-beautiful-unique-validation');

// TODO: implement url validation
const userSchema = new mongoose.Schema({
    'username':{
        type: String,
        required: true,
        unique: true,
        validate(value) {
            // username validation on bottom
            return true;
        },
        minlength:6,
        maxlength:20
    },
    'email':{
        type: String, 
        required: true,
        unique: true,
        trim: true,
        validate(value) {
            // implement email validation
            return true;
        }
    },
    'password':{
        type: String, 
        required: true,
        validate(value) {
            // implement email validation
            return true;
        }
    },
    
    'registerDate': {
        type: String,
        required: true,
        default: Date.now()
    }

});
userSchema.plugin(beautifyUnique);

userSchema.path('username').validate(function (value, respond) {
    // alphanumeric with underscore and dot, 
    // can't start or end with either _.
    // cant have _. twice 
    const usernameRegex = /^(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/;
    return usernameRegex.test(value, function(){
      respond(false, 'Invalid username, only alphanumeric allowed. You can use underscore and dot in the middle');
  });
  }, '${value} is not a valid login - [0-9]{6,15}[a-zA-Z]');
  


module.exports = mongoose.model('user', userSchema);