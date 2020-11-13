const LocalStrat = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const userModel= require('./models/userSchema');

function initialize(passport, email){
    const authenticateUser = async (email, password, done) => {
        console.log(`authenticating user`);
        // should wrap this in try catch?
        const user = await userModel.findOne({email:email});
        if(!user){
            // null= no error, false = no user found
            console.log(`found user named ${user.name}`);
            return done(null, false, {message:"User not found"});
        } 
        try {
            console.log([password, user.password]);
            if (await bcrypt.compare( password, user.password) ) {
                // found user
                console.log(`user found`);
                return done(null, user);

            } else {
                console.log(`user not found`);
                // user found, password not match
                return done(null, false, {message: "Wrong password, try again"});
            }
        } catch (error) {
            return done (error);
        }
    };
    passport.use(new LocalStrat({usernameField: 'email', passwordField:'password'}, authenticateUser));

    passport.serializeUser((user, done) =>{
        console.log(`serialize user ${user.email}`);
        done (null, user.id);
    });
    passport.deserializeUser((id, done) => {
        userModel.findById(id, (err, user) => {
            console.log(`deserialize user ${user}`);
            done (err, user);
        });
    });


    // function isAuthenticated(req, res, next) {
    //     if (req.isAuthenticated())
    //         return next();
    //     res.redirect('/login');
    // }
}
module.exports=initialize;