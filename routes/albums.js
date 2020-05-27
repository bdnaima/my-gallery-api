const express = require('express');
const router = express.Router();
const models = require('../models');


/** Get All Albums */

router.get('/', async (req, res) => {
    const all_albums = await new models.Album({}).fetchAll();

    res.send({
        status: 'success',
        data: {
            albums: all_albums
        }
    });
});

/** Get /:albumId */
router.get('/:albumId', async(req, res) => {
    const album = await new models.Album({ id: req.params.albumId}).fetch();

    res.send({
        status: "success",
        data: {
            album,
        }
    });
});

module.exports = router;