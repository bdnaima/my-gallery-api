const express = require('express');
const router = express.Router();
const photoController = require('../controllers/photo_controller');
const photoValidationRules = require('../validation_rules/photo');

/** GET all photos */

router.get('/', photoController.index);

/** GET /:photoId */
router.get('/:photoId', photoController.show);

/** Create new photo - POST  */

router.post ('/', photoValidationRules.createRules, photoController.store);

/** Delete photo */
router.delete('/:photoId', photoController.destroy);



module.exports = router;