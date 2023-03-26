let path = require('path');
let ErrorHandler = (err, req, res, next) => {
  const errStatus = err.statusCode || 500;
  const errMsg = err.message || 'Something went wrong ';
  // res.status(errStatus).json({
  //     success : false,
  //     massage : errMsg,
  //     statusCode : statusCode,
  // })
  res.sendFile(path.join(__dirname + './../views/error.html'));
};

module.exports = ErrorHandler;
