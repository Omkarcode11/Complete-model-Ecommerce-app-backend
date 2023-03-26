let jwt = require('jsonwebtoken');
let config = require('./../config/auth.config');

const VerifyToken = (req, res, next) => {
  let token = req.headers["token"]
  if (!token) {
    res.status(401).json({
      message: 'Unauthorize',
    });
    return;
  }
  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      res.status(401).json({
        message: 'wrong token pass',
      });
    }

    req.userId = decoded.id
    next()
  });
};

module.exports = {
  VerifyToken,
};
