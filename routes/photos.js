const express = require('express');
const router = express.Router();
const photoController = require('../controllers/photo_controller');

/** GET all photos */

router.get('/', photoController.index);

/** GET /:photoId */
router.get('/:photoId', photoController.show);

/** Create new photo - POST  */

router.post ('/', photoController.store);

/** Delete album */
router.delete('/:photoId', photoController.destroy);

module.exports = router;