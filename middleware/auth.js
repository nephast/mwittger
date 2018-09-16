require('dotenv').load();
const jwt = require('jsonwebtoken');

const loginRequired = (req, res, next) => {
  try {
    let token = req.headers.authorization.split(' ')[1];
    console.log('TOKEN', token)
    jwt.verify(token, process.env.SECRET_KEY_TOKEN, (err, decoded) => {
      if (decoded) {
        return next()
      }
      return next({
        status: 401,
        message: 'You need to log in first'
      })
    })
    } catch (err) {
    return {
      status: 401,
      message: 'You need to login first'
    }
  }
};

const authorisedUser = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    jwt.verify(token, process.env.SECRET_KEY_TOKEN, (err, decoded) => {
      if (decoded && decoded.id === req.params.id) {
        return next()
      }
      return next({
        status: 401,
        message: 'Unauthorised'
      })
    })
  } catch (err) {
    return next({
      status: 401,
      message: 'Unauthorised'
    })
  }
};

module.exports = {
  loginRequired,
  authorisedUser
};
