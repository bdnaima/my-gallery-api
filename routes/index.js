const express = require('express');
const router = express.Router();
const auth = require('../controllers/middlewares/auth');

/* GET /  */
router.get('/', (req, res) => {
  res.send({ status: 'success' });
});

// Authenticating all routes with middleware basic
// router.use(auth.basic);

router.use('/photos', require('./photos'));
router.use('/albums', require('./albums'));
router.use('/profile', [auth.basic], require('./profile'));

router.use('/users', require('./users'));

module.exports = router;
