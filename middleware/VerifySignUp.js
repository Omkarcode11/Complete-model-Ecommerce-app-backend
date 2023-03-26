let db = require('../model/index');
let User = db.user;
let Roles = db.Roles;

let checkDuplicateUserName = async (req, res, next) => {
  let name = req.body.username;
  if (!name) {
    res.status(400).send('enter user name');
    return;
  }
  let user = await User.findAll({
    where: {
      userName: name,
    },
  });

  if (user.length!=0) {
    res.status(400).json({
      message: 'User already exist',
    });
    return;
  }
  next();
};

let checkRoleExist = (req, res, next) => {
  if (req.body.roles) {
    for (let i = 0; i < req.body.roles.length; i++) {
      if (!Roles.includes(req.body.roles)) {
        res.status(400).send({
          message: 'Failed! Role does not exits' + req.body.roles[i],
        });
        return;
      }
    }
  }
};

// const verifySignUp = {
//     checkDuplicateUserName : checkDuplicateUserName
// }

module.exports = { checkDuplicateUserName, checkRoleExist };
