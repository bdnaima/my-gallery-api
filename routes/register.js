const bcrypt = require('bcrypt');
const { matchedData, validationResult } = require('express-validator');
const { User } = require('../models')


// Create new user
const register = async (req, res) => {
    //Check validation result
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(422).send({ errors: errors.array() });
      return;
    };
    
    const validData = matchedData(req);
  
    //Hashing of password
    try {
      const hash = await bcrypt.hash(validData.password, User.hashSaltRounds);
      validData.password = hash;
  
    } catch(error) {
      res.status(500).send({status: 'error', message: "Something went wrong when hashing the password."});
  
      throw error;
      
    }
  
  
    try{
      const user = await new User(validData).save();
      res.send({
        status: "success",data: {user,}, });
  
    } catch (error) {
        res.status(405).send({status: 'error', message: "Method not allowed"});
        
        throw error;
      };
  
  };

  module.exports = register;