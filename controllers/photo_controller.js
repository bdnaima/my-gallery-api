/**
 * Photo controller
 */

 const models = require('../models')

/** Get all photos */
 const index = async (req, res) => {
        const all_photos = new models.Photo({})
        await all_photos.fetchAll();
    
        res.send({
            status: 'success',
            data: {
                photos: all_photos
            }
        });
    };


    /** Show individual photo */
const show = async(req, res) => {
    const photo = new models.Photo({ id: req.params.photoId})
    await photo.fetch();

    res.send({
        status: "success",
        data: {
            photo
        }
    });
};

const store = async (req, res) => {
    const photo = new models.Photo({
        title: req.body.title,
        url: req.body.url,
        comment: req.body.comment,
        user_id: req.body.user_id,
    });
    await photo.save()
    res.send({
        status: "success",
        data: {
            photo
        },
    })
};

 module.exports = {
     index,
     show,
     store,
 }