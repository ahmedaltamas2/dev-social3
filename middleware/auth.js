const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function (req, res, next) {
  
  const token = req.header('x-auth-token'); //as token is in header

  
  if (!token) {
    return res.status(401).json({ msg: 'No token' });
  }

  
  try {
    jwt.verify(token, config.get('jwtSecret'), (error, decoded) => { //verify the token and decode it
      if (error) {
        return res.status(401).json({ msg: 'Token is not valid' });
      } else {
        req.user = decoded.user;  //req.user has all the data as object
        next();
      }
    });
  } catch (err) {
    console.error('something wrong with auth middleware');
    res.status(500).json({ msg: 'Server Error' });
  }
};
