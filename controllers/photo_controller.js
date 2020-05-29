/**
 * Photo controller
 */
const { validationResult } = require('express-validator');
const models = require("../models");

/** Get all photos */
const index = async (req, res) => {

  try {
    const all_photos = await new models.Photo().fetchAll();

    res.send({
      status: "success", data: {photos: all_photos,}, });

  } catch (error) {
      res.status(500).send({status: 'fail', message: "Sorry, server error"});

      throw error;
  };
};


/** Show individual photo */
const show = async (req, res) => {
  
//   if (!req.params.photoId) {
//     res.send({status: "fail",data: {id: "Photo does not exist."}});
// };

  try {
    const photo = await new models.Photo({ id: req.params.photoId }).fetch();

    res.send({
      status: "success", data: {photo,}, });
    
  } catch (error) {
      res.status(404).send({status: 'fail', message: "Cannot find page."});

      throw error;
  };
};


//Create new photo



const store = async (req, res) => {

//Check validation result
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log("Wrong.", errors.array());
    res.status(422).send({ errors: errors.array() });
    return;
  };

  //Extract valid data


  //Insert valid data
  const photoInfo = {
    title: req.body.title,
    url: req.body.url,
    comment: req.body.comment,
    user_id: req.body.user_id,
  };
  
  try {
    const photo = await new models.Photo(photoInfo).save();
    res.send({
      status: "success",data: {photo}, });

  } catch (error) {
    res.status(405).send({status: 'fail', message: "Method not allowed."});
  }
};


// Delete Photo
const destroy = async (req, res) => {

  try{
    const photo = await new models.Photo({ id: req.params.photoId }).fetch( {withRelated: 'albums'} );
    
    await photo.albums().detach();
    await photo.destroy();

    res.send({
      status: "success", data: {photo}, });

  } catch (error) {
      res.status(405).send({status: 'fail', message: "Method not allowed."});
  }
};

module.exports = {
  index,
  show,
  store,
  destroy,
};
