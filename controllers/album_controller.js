/** 
 * Album controller
*/
const { validationResult } = require('express-validator');
const models = require('../models')

// Show all albums
const index = async (req, res) => {

    console.log(req.user)

    try{
        const all_albums = await new models.Album({}).where('user_id', req.user.id).fetchAll();
            res.send({
                status: 'success', data: {albums: all_albums}, });
    
    } catch (error) {
        res.status(500).send({status: 'error', message: "Sorry, server error"});

        throw error;
    };
};

//Show individual album
const show = async(req, res) => {

    try {
    const album = await new models.Album({ id: req.params.albumId, user_id: req.user.id}).fetch( {withRelated:'photos'});
        res.send({status: "success", data: {album,}, });
    
    } catch (error) {
        res.status(404).send({status: 'error', message: "Album does not exist in your account."});

        throw error;
    };
};

// Create new album
const store = async (req, res) => {

    //Check validation result
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(422).send({ errors: errors.array() });
        return;
    };


    try {
        const album = new models.Album({title: req.body.title, user_id: req.user.id, });

        await album.save()
        res.send({status: "success", data: {album}, });
    
    } catch (error) {
        res.status(405).send({status: 'error', message: "Method not allowed"});

        throw error;
    };
};

// Add photo in an album 
const update = async (req, res) => {

    const album = new models.Album({ id: req.params.albumId, user_id: req.user.id, });
    const photo = new models.Photo({ id: req.params.photoId, user_id: req.user.id, });

     //Check validation result
     const errors = validationResult(req);
     if (!errors.isEmpty()) {
     console.log(`Validation for updating with ID: ${photo} failed.`, errors.array());
     res.status(422).send({ errors: errors.array() });
     return;
     };
    
    try {
        await album.fetch({withRelated: 'photos'})
        await photo.fetch({withRelated: 'albums'})
        await album.photos().attach(photo)
        res.send({status: "success",data: album});

    } catch {
        res.status(404).send({status: 'error', message: "Not found."});

        throw error;
    };
};


// Delete album
const destroy = async (req, res) => {

    try {
        const album = await new models.Album({ id: req.params.albumId, user_id: req.user.id}).fetch( {withRelated: 'photos'} );
        
        await album.photos().detach();
        await album.destroy();
    
        res.send({status: "success", data: {album}, });
        
    } catch (error) {
        res.status(404).send({status: 'error', message: "Delete failed. Album does not exist in your account."});

        throw error;
    }
  };

// Delete a photo from specific album  -- NOT WORKING YET
  const destroyPhoto = async (req, res) => {
    const album = new models.Album({ id: req.params.albumId });
    const photo = new models.Photo({ id: req.params.photoId });

    try {
        await album.fetch({withRelated: 'photos'})
        await photo.fetch({withRelated: 'albums'})
        await album.photos().destroy(photo);

        res.send({status: "success",data: album});

    } catch {
        res.status(405).send({status: 'error', message: "Method not allowed"});

        throw error;
    };
  
};



module.exports = {
    index,
    show,
    store,
    update,
    destroy,
    destroyPhoto,
}