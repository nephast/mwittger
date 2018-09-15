const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  text: {
    type: String,
    maxlength: 160,
    required: true
  },
  user: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'User'
    }
  ]
});

messageSchema.pre('remove', async function(next) {
  try {
    let user = await User.findById(this.user);
    User.messages.remove(this.id);
    await user.save();
    return next();
  } catch (err) {
    return next(err);
  }
});

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;
