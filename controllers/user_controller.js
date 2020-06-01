/**
 * User controller
 */
const models = require("../models");


/** Show individual user */
const show = async (req, res) => {
  if ({id: req.user.id})

  try{
    const user = await new models.User({id: req.user.id}).fetch({withRelated: ['albums', 'photos']});

    res.send({
      status: "success", data: {user,}, });

  } catch (error) {
      res.status(405).send({status: 'error', message: "Not allowed to access."});

      throw error;
    };

};


// Delete User
const destroy = async (req, res) => {

  try{
    const user = await new models.User({ id: req.params.userId, user_id: req.user.id, }).fetch( {withRelated: 'albums'} );
    
    await user.users()
    await user.destroy();

    res.send({
      status: "success", data: {user,}, });
      
  } catch (error) {
      res.status(405).send({status: 'error', message: "Method not allowed"});
        
      throw error;
    };

};

module.exports = {
  show,
  destroy,
};
