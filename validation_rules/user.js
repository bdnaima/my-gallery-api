/**
 * User Validation Rules
 */

const { body } = require('express-validator');



const createRules = [
	
	body('username').isLength({ min: 3 }),
	body('password').isLength({ min: 3 }),
	body('first_name').isLength({ min: 3 }),
	body('last_name').isLength({ min: 3 }),
];


module.exports = {
    createRules,
}