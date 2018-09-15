const db = require('../models');
const jwt = require('jsonwebtoken');

const signup = async (req, res, next) => {
  try {
    let user = await db.User.create(req.body);
  let { id, username, profilePictureUrl } = user;
  let token = jwt.sign({
    id,
    username,
    profilePictureUrl
  }, 
  process.env.SECRET_KEY_TOKEN
  );
  return res.status(201).json({
    id,
    username,
    profilePictureUrl,
    token
  });
  } catch (err) {
    // if validation fails
    if (err.code === 11000) {
      err.message = 'Sorry, that email and/or username is taken'
    } 
    return next({
      status: 400,
      message: err.message
    });
  } 
};

module.exports = {
  signup
}