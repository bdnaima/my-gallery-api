/** 
 * Authentication
 */

 const { User } = require('../../models')

 const basic = async (req, res, next) => {
     console.log("From auth.basic");
    
     // Check if authorization header exists, otherwise deny.
     if (!req.headers.authorization) {
         res.status(401).send({status:'fail', data: 'Authorization required'});
         return;
     }

     //Splitting Basic and decoding
    const [authSchema, base64Payload] = req.headers.authorization.split(' ');

     if(!authSchema.toLowerCase() === "basic") {
         // not ours to authenticate
         next();
     };

    //Decoding
    const decodedPayload = Buffer.from(base64Payload, 'base64').toString('ascii');
    
    //User information
	const [email, password] = decodedPayload.split(':');

	// ask db if it has a matching user with the same username and password
	const user = await new User({ email, password }).fetch({ require: false });
	if (!user) {
		res.status(401).send({
			status: 'fail',
			data: 'Authorization failed',
		});
		return;
    }
    
	req.user = user;
     next();
};

module.exports = {
    basic,
}