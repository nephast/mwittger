const db = require('../models');

const createMessage = async (req, res, next) => {
  try {
    const message = await db.Message.create({
      text: req.body.text,
      user: req.params.id
    });
    const foundUser = await db.User.findById(req.params.id);
    foundUser.messages.push(message.id);
    await foundUser.save();
    let foundMessage = await db.Message.findById(message._id).populate('user', {
      username: true,
      profileImageUrl: true
    });
    return res.status(201).json(foundMessage);
  } catch (err) {
    return next(err);
  }
};

module.exports = {
  createMessage
};
