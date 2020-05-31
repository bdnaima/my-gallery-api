/**
 * Profile controller
 */
const { validationResult } = require('express-validator');
const models = require("../models");

/** Get autheticated user's profile  */

const getProfile = async (req, res) => {

  if (!req.user) {
    res.status(401).send({
      status: 'fail', 
      data: 'Authentication Required.'
    });
    return;
  }

  res.send({
    status: 'success', data: {user: req.user}, });
}
  

/** Get authenticated user's photos */
const getPhotos = async (req, res) => {

  try{
    const user = await new models.User({ id: req.params.userId }).fetch({withRelated: ['albums', 'photos']});

    res.send({
      status: "success", data: {user,}, });

  } catch (error) {
      res.status(405).send({status: 'error', message: "Method not allowed"});

      throw error;
    };

};


 // Update authenticated user's profile
 // PUT 
const updateProfile = async (req, res) => {
  
//Check validation result
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(422).send({ errors: errors.array() });
    return;
  };
  
 
  const userInfo = {
    email: req.body.email,
    password: req.body.password,
    first_name: req.body.first_name,
    last_name: req.body.last_name,
  };

  try{
    const user = await new models.User(userInfo).save();
    res.send({
      status: "success",data: {user,}, });

  } catch (error) {
      res.status(405).send({status: 'error', message: "Method not allowed"});
      
      throw error;
    };

};

module.exports = {
  getProfile,
  getPhotos,
  updateProfile,
};
