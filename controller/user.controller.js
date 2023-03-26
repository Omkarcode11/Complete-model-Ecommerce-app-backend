let db = require('./../model/index');

let getAllUser = async (req, res, next) => {
  let users = await db.user.findAll();
  res.status(200).write(JSON.stringify(users,null,1));
  res.end();
};

module.exports = { getAllUser };
