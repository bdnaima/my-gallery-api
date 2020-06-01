const express = require('express');
const router = express.Router();
const auth = require('../controllers/middlewares/auth');
const registerValidationRules = require('../validation_rules/user');

/* GET /  */
router.get('/', (req, res) => {
  res.send({ status: 'success' });
});

// Create new user
router.post('/register', registerValidationRules.createRules, require('./register'));

// Authenticating all routes with middleware basic
router.use(auth.basic);

router.use('/photos', require('./photos'));
router.use('/albums', require('./albums'));
router.use('/users', require('./users'));

router.use((req, res) => {
  res.status(401).send({
    status: "fail", message: 'Could not proccess request.', });
});

module.exports = router;
