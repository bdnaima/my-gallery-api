/** 
 * Authentication
 */
const bcrypt = require('bcrypt');
const { User } = require('../../models');

const basic = async (req, res, next) => {
    
     // Check if authorization header exists, otherwise deny.
     if (!req.headers.authorization) {
         res.status(401).send({status:'fail', data: 'Authorization required'});
         return;
     }

     //Splitting Basic and decoding
    const [authSchema, base64Payload] = req.headers.authorization.split(' ');

     if(authSchema.toLowerCase() !== "basic") {
         // not supported
         res.status(401).send({status:'fail', data: 'Authentication required.'});
         return;
     };

    //Decoding
    const decodedPayload = Buffer.from(base64Payload, 'base64').toString('ascii');
    
    //User information
    const [email, password] = decodedPayload.split(':');
    if(!email || !password) {
        res.status(401).send({status: 'fail', data: 'must have appropriate email and password.',});
        return
    }
    
    const user = await new User({email}).fetch({ require: false });
    if (!user) {
		res.status(401).send({status: 'fail', data: 'Authorization failed', });
        return;
    }

    const hash = user.get('password');

    //Comparison
    const result = await bcrypt.compare(password, hash);

	if (!result) {
		res.status(401).send({status: 'fail', data: 'Authorization failed', });
		return;
    }
    
	req.user = user;
    next();
};

module.exports = {
    basic,
}