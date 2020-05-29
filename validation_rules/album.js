const { body } = require('express-validator');


const createRules = [
    body('title').trim().isLength({ min: 4 }),
];

const updateRules = [
	body('title').optional().isLength({ min: 3 }),
	body('url').optional().isLength({ min: 2 }),
	body('comment').optional().isLength({ min: 2 }),
];


module.exports = {
    createRules,
    updateRules,
}