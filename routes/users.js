const express = require('express');
const router = express.Router();
const userController = require('../controllers/user_controller')
const userValidationRules = require('../validation_rules/user');


/** Get All Users */

router.get('/', userController.index);

/** Get /:userId */
router.get('/:userId', userController.show);

/** Create new user - POST  */

router.post ('/', userValidationRules.createRules, userController.store);

/** Delete user */

router.delete('/:userId', userController.destroy);

// /** Update  photo */
// router.put('/:albumId/photos/:photoId', userController.update);

module.exports = router;