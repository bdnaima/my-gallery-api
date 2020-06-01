const express = require('express');
const router = express.Router();
const userController = require('../controllers/user_controller')




/** Get /:userId */
router.get('/:userId', userController.show);

/** Delete user */
router.delete('/:userId', userController.destroy);

module.exports = router;