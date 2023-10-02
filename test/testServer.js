const {expect} = require("chai")
const request = require("request")

describe("register testing", function() {
    it('returns status code of 201', function(done) {    
  const Data = {
      "firstname":"darsh",
      "lastname": "patel",
      "email":"dar@hmail.com",
      "username": "darshp",
      "password": "d@123",
     }; 
      request.post(
        {
          url: 'http://localhost:5000/',
          json: Data
        },
        done()
      );
    });
  });

  
describe("login testing", function() {
    it('returns status code of 201', function(done) {
   
  const Data = {
      "email": "darshp",
      "password": "d@123",
     }; 
      request.post(
        {
          url: 'http://localhost:5000/login',
          json: Data
        },
        done()
      );
    });
  });
  

   
describe("post reply testing", function() {
    it('returns status code of 201', function(done) {
     
  const Data = {
      "postReply": "Yes How are you",
     }; 
      request.post(
        {
          url: 'http://localhost:5000/api/posts',
          json: Data
        },
        done()
      );
    });
  });
  

  
  
describe("delete post Test", function() {
    it('returns status code of 200', function(done) {
      const postId = '1'; 
  
      request.delete(
        {
          url: 'http://localhost:5000/api/posts/${postId}'
        },
        done()
      );
    });
  });
  


describe("retweet post testing", function() {
    it('returns status code of 201', function(done) {
     
  const Data = {
      "postID": "1",
     }; 
      request.post(
        {
          url: 'http://localhost:5000/api/posts/${postId}/retweet',
          json: Data
         
        },
        done()
      );
    });
  });
  
  describe("follow testing", function() {
    it('returns status code of 201', function(done) {
     
  const Data = {
      "userID": "1",
     }; 
      request.put(
        {
          url: 'http://localhost:5000/:userId/follow',
          json: Data
         
        },
        done()
      );
    });
  });

 
  describe("get followers testing", function() {
    it('returns status code of 201', function(done) {
     
  const Data = {
      "userID": "1",
     }; 
      request.get(
        {
          url: 'http://localhost:5000/:userId/followers',
          json: Data
         
        },
        done()
      );
    });
  });

   
  describe("get followers testing", function() {
    it('returns status code of 201', function(done) {
     
  const Data = {
      "userID": "1",
     }; 
      request.get(
        {
          url: 'http://localhost:5000/:userId/follow',
          json: Data  
        },
        done()
      );
    });
  });

  
 


