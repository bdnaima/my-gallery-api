/**
 * Photo controller
 */
const { validationResult } = require('express-validator');
const models = require("../models");

/** Get all photos */
const index = async (req, res) => {

  try {
    const all_photos = await new models.Photo().where('user_id', req.user.id).fetchAll();

    res.send({
      status: "success", data: {photos: all_photos,}, });

  } catch (error) {
      res.status(500).send({status: 'error', message: "Sorry, server error"});

      throw error;
    };
};


/** Show individual photo */
const show = async (req, res) => {
  
  try {
    const photo = await new models.Photo({ id: req.params.photoId, user_id: req.user.id }).fetch();

    res.send({
      status: "success", data: {photo,}, });
    
  } catch (error) {
      res.status(404).send({status: 'error', message: "Photo does not exist in your account."});

      throw error;
    };
};


//Create new photo
const store = async (req, res) => {

//Check validation result
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(422).send({ errors: errors.array() });
    return;
  };

  //Insert valid data
  
  try {
    const photo =  new models.Photo({
      title: req.body.title, 
      url: req.body.url, 
      comment: req.body.comment, 
      user_id: req.user.id
    });

    await photo.save();
    res.send({
      status: "success",data: {photo}, });

  } catch (error) {
      res.status(405).send({status: 'error', message: "Method not allowed"});
      
      throw error;
    };
};


// Delete Photo
const destroy = async (req, res) => {

  try{
    const photo = await new models.Photo({ id: req.params.photoId, user_id: req.user.id }).fetch( {withRelated: 'albums'} );
    
    await photo.albums().detach();
    await photo.destroy();

    res.send({
      status: "success", data: {photo}, });

  } catch (error) {
      res.status(404).send({status: 'error', message: "Delete failed. Photo does not exist in your account."});

      throw error;  
    };
};

module.exports = {
  index,
  show,
  store,
  destroy,
};
