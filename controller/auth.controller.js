const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Op } = require('sequelize');
const db = require('./../model/index');
const key = require('./../config/auth.config');
// const User = db.user;
// const Role = db.roles;

let signup = async (req, res) => {
  let user = await db.user.create({
    userName: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 12),
  });
  if (!req.body.roles) {
    let roles = 'user';
    await user.setRole(roles);
    res.status(200).send('User Added successfully with role User');
  }
  if (req.body.roles) {
    let roles = await db.roles.findAll({
      where: {
        name: {
          [Op.or]: req.body.roles,
        },
      },
    });
    if (!roles) {
      roles = 'user';
    }
    await user.setRoles(roles);
    res.status(200).json({
      message: 'User Registered Successfully With Role',
    });
  }
  // res.status(200).send('User Added Successfully');
  // res.end();
};

let signin = async (req, res) => {
  let userName = await db.user.findOne({
    where: {
      username: req.body.username,
    },
  });
  if (!userName) {
    res.status(404).json({
      message: 'user not found',
    });

    return;
  }

  let isPassword = bcrypt.compareSync(req.body.password, userName.password);

  if (!isPassword) {
    res.status(401).json({
      message: 'Password is incorrect',
    });
    return;
  }
  let token = jwt.sign({ id: userName.id }, key.secret, { expiresIn: 86400 });

  let authorities = [];
  let roles = await userName.getRoles();
  for (let i = 0; i < roles.length; i++) {
    authorities.push('ROLE_' + roles[i].name.toUpperCase());
  }

  res.status(200).send({
    id: userName.id,
    username: userName.userName,
    email: userName.email,
    roles: authorities,
    token: token,
  });
  res.end();
};

module.exports = {
  signup,
  signin,
};
