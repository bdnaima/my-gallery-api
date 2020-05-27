const express = require('express');
const router = express.Router();
const models = require('../models');

/** GET */
router.get('/', async (req, res) => {
    const all_photos = await new models.Photo({}).fetchAll();

    res.send({
        status: 'success',
        data: {
            photos: all_photos
        }
    });
});

/** Get /:photoId */
router.get('/:photoId', async(req, res) => {
    const photo = await new models.Photo({ id: req.params.photoId}).fetch();

    res.send({
        status: "success",
        data: {
            photo,
        }
    });
});

module.exports = router;