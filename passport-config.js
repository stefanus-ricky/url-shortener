const LocalStrat = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const express = require('express');
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
            console.log([user.password, password]);
            if (await bcrypt.compare( password,user.password) ) {
                // found user
                console.log(`user found`);
                return done(null, user);

            } else {
                console.log(`user not found`)
                // user found, password not match
                return done(null, false, {message: "Wrong password, try again"});
            }
        } catch (error) {
            return done (error);
        }
    };
    passport.use(new LocalStrat({usernameField: 'email', passwordField:'password'}, authenticateUser));

    passport.serializeUser((user, done) =>{
        done (null, user.id);
    });
    passport.deserializeUser((id, done) => {
        userModel.findById(id).then((err, user) => {
            done (err, user);
        });
    });
}
module.exports=initialize;