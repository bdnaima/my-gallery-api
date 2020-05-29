const { body } = require('express-validator');


const createRules = [
    body('title').trim().isLength({ min: 4 }),
    body('url').trim().isLength({ min: 3 }),
    body('comment').trim().isLength({ min: 3 }),
];


module.exports = {
 createRules,
}