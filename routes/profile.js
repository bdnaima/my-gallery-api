const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profile_controller')
const profileValidationRules = require('../validation_rules/profile');


/** Get user */
router.get('/', profileController.getProfile);

/** Get users photos */
router.get('/photos', profileController.getPhotos)

/** Update */
router.put('/', profileValidationRules.updateProfileRules, profileController.updateProfile);

module.exports = router;