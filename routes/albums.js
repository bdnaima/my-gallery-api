const express = require('express');
const router = express.Router();
const albumController = require('../controllers/album_controller')


/** Get All Albums */

router.get('/', albumController.index);

/** Get /:albumId */
router.get('/:albumId', albumController.show);

/** Create new album - POST  */

router.post ('/', albumController.store);

module.exports = router;