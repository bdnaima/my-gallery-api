/**
 * Usercontroller
 */

const models = require("../models");

/** Get  */
const index = async (req, res) => {
  const all_users = await new models.User().fetchAll();

  res.send({
    status: "success",
    data: {
      users: all_users,
    },
  });
};

/** Show individual user */
const show = async (req, res) => {
  const user = await new models.User({ id: req.params.userId }).fetch({withRelated: ['albums', 'photos']});

  res.send({
    status: "success",
    data: {
      user,
    },
  });
};

const store = async (req, res) => {
  const userInfo = {
    email: req.body.email,
    password: req.body.password,
    first_name: req.body.first_name,
    last_name: req.body.last_name,
  };
  
  const user = await new models.User(userInfo).save();
  res.send({
    status: "success",
    data: {
      user,
    },
  });
};

// Delete User
const destroy = async (req, res) => {
  const user = await new models.User({ id: req.params.userId }).fetch( {withRelated: 'albums'} );
  
  await user.users()
  await user.destroy();

  res.send({
    status: "success",
    data: {
      user,
    },
  });
};

module.exports = {
  index,
  show,
  store,
  destroy,
};
