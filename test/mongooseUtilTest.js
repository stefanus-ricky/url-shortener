const mongooseUtil = require("../models/mongooseUtil");
const mongoose = require('mongoose');
const urlModel = require('../models/urlSchema');

var assert = require('chai').assert;
var expect = require('chai').expect;
const testdata = new urlModel ({endUrl: "www.example.com/123", shortUrl:"/mon", owner:"mongooseUtilsTest"});

describe('mongoose db test', function() {

  context('without arguments', function() {
    it('should return false', function() {
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

  context('saving new data', () => {
    it('should return be no error', (done) => {
      async function test () {
        try {
          await testdata.save();

          done();        
        } catch (err) { 
          console.log(err);
          // expect(err).to.equal(null);
        }
      }
      test();
    });
  });

  context('read data', () => {
    it('should return value equal to testdata', (done) => {
      async function test(){
        //create
        try {
          const urlList = await urlModel.findOne({owner:"mongooseUtilsTest"});
          console.log(`end url  is ${urlList}`);
          console.log(urlList.endUrl === "www.example.com/123");
          expect(urlList.endUrl).to.equal("www.example.com/123");
          done();        
        } catch (err) { console.log(err);}
      }
      test();
    });
  });

  context('deleting data', () => {
    it('should delete the data', (done) => {
      async function test(){
        try {
          await urlModel.deleteOne({shortUrl:"/mon"} );
          done();        
        } catch (err) { console.log(err);}
      }
      test();
    });
  });

});
