const mongooseUtil = require("../models/mongooseUtil");
const mongoose = require('mongoose');
const userModel = require('../models/userSchema');

var assert = require('chai').assert;
var expect = require('chai').expect;
const testUser = new userModel ({username: "hey123", password:"qwert123", email:"hey@gmail.com"});

describe('mongoose user register test', function() {

  context('without arguments', function() {
    it('should return true', function() {
      expect('asd').to.equal('asd');
    });
  });

  context('connecting to database', () => {
    it('should return be no error', (done) => {
      mongooseUtil.connectToServer((err)=> {
          expect(err).to.equal(null);
          done();
      });
      mongoose.connection = mongooseUtil.getDb(); 
    });
  });

  context('finding user', () => {
    it('should return be no error if the test run second time', (done) => {
      async function test () {
        try {
            const user = await userModel.findOne({email:"hey@gmail.com"});
            expect(user.username).to.equal("hey123");
            done();        
        } catch (err) { 
            console.log(err);
        }
      }
      test();
    });
  });

  context('delete user', () => {
    it('should delete the data', (done) => {
      async function test(){
        try {
          await userModel.deleteOne({email:"hey@gmail.com"} );
          done();        
        } catch (err) { 
            console.log(err);
        }
      }
      test();
    });
  });

  context('register new user', () => {
    it('should return no error', (done) => {
      async function test () {
        try {
            await testUser.save();
            done();        
        } catch (err) { 
            console.log(err);
            expect(err).to.equal(null);
        }
      }
      test();
    });
  });

  context('register same username twice', () => {
    it('should return validation error', (done) => {
        async function test () {
            try {
                const testUser1 = new userModel ({username: "hey123", password:"qwert123", email:"hey@gmail.com"});
                const testUser2 = new userModel ({username: "hey123", password:"qwert123", email:"hey@gmail.com"});
                await testUser1.save();
                await testUser2.save();
                console.log(`err, shoundt be success`);
                expect(false).to.equal(true);
                done();        
            } catch (err) { 
                expect(err._message).to.equal('Validation failed');
                done();
            }
          }
          test();
    });
  });


});
