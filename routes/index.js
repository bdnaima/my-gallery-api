const express = require('express');
const router = express.Router();

/* GET /  */
router.get('/', (req, res) => {
  res.send({ status: 'success' });
});

router.use('/photos', require('./photos'));

module.exports = router;
