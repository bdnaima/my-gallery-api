/**
 * Photo controller
 */

const models = require("../models");

/** Get all photos */
const index = async (req, res) => {
  const all_photos = await new models.Photo().fetchAll();

  res.send({
    status: "success",
    data: {
      photos: all_photos,
    },
  });
};

/** Show individual photo */
const show = async (req, res) => {
  const photo = await new models.Photo({ id: req.params.photoId }).fetch();

  res.send({
    status: "success",
    data: {
      photo,
    },
  });
};

const store = async (req, res) => {
  const photoInfo = {
    title: req.body.title,
    url: req.body.url,
    comment: req.body.comment,
    user_id: req.body.user_id,
  };
  
  const photo = await new models.Photo(photoInfo).save();
  res.send({
    status: "success",
    data: {
      photo,
    },
  });
};

// Delete Photo
const destroy = async (req, res) => {
  const photo = await new models.Photo({ id: req.params.photoId }).fetch( {withRelated: 'albums'} );
  
  await photo.albums().detach();
  await photo.destroy();

  res.send({
    status: "success",
    data: {
      photo,
    },
  });
};

module.exports = {
  index,
  show,
  store,
  destroy,
};
