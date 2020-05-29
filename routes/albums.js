const express = require('express');
const router = express.Router();
const albumController = require('../controllers/album_controller');
const albumValidationRules = require('../validation_rules/album');


/** Get All Albums */

router.get('/', albumController.index);

/** Get /:albumId */
router.get('/:albumId', albumController.show);

/** Create new album - POST  */

router.post ('/', albumValidationRules.createRules, albumController.store);

/** Update  photo */
router.put('/:albumId/photos/:photoId', albumValidationRules.updateRules, albumController.update);

/** Delete album */

router.delete('/:albumId', albumController.destroy);

/**Delete photo from album */
router.delete('/:albumId/photos/:photoId', albumController.destroyPhoto);

module.exports = router;