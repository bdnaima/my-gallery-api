/**
 * Usercontroller
 */
const bcrypt = require('bcrypt');
const { matchedData, validationResult } = require('express-validator');
const models = require("../models");

/** Get  */

const index = async (req, res) => {

  try {
    const all_users = await new models.User().fetchAll();

    res.send({
      status: "success", data: {users: all_users,}, });

  } catch (error) {
      res.status(500).send({status: 'error', message: "Sorry, server error"});

      throw error;
    };

}

/** Show individual user */
const show = async (req, res) => {

  try{
    const user = await new models.User({ id: req.params.userId }).fetch({withRelated: ['albums', 'photos']});

    res.send({
      status: "success", data: {user,}, });

  } catch (error) {
      res.status(405).send({status: 'error', message: "Method not allowed"});

      throw error;
    };

};


 // Create new user
const store = async (req, res) => {
  
  //Check validation result
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(422).send({ errors: errors.array() });
    return;
  };
  
  const validData = matchedData(req);

  //Hashing of password
  try {
    const hash = await bcrypt.hash(validData.password, models.User.hashSaltRounds);
    validData.password = hash;

  } catch(error) {
    res.status(500).send({status: 'error', message: "Something went wrong when hashing the password."});

    throw error;
    
  }


  try{
    const user = await new models.User(validData).save();
    res.send({
      status: "success",data: {user,}, });

  } catch (error) {
      res.status(405).send({status: 'error', message: "Method not allowed"});
      
      throw error;
    };

};


// Delete User
const destroy = async (req, res) => {

  try{
    const user = await new models.User({ id: req.params.userId }).fetch( {withRelated: 'albums'} );
    
    await user.users()
    await user.destroy();

    res.send({
      status: "success", data: {user,}, });
      
  } catch (error) {
      res.status(405).send({status: 'error', message: "Method not allowed"});
        
      throw error;
    };

};

module.exports = {
  index,
  show,
  store,
  destroy,
};
