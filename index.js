require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { genericErrorHandler, notFoundErrorHandler } = require('./handlers/error');
const authRoutes = require('./routes/auth');
const messagesRoutes = require('./routes/messages');
const { loginRequired, authorisedUser } = require('./middleware/auth');
const db = require('./models');

const PORT = process.env.PORT || 4000;

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.use('/api/auth', authRoutes);
app.use('/api/users/:id/messages', loginRequired, authorisedUser, messagesRoutes);

app.get('/api/messages', loginRequired, async (req, res, next) => {
  try {
    const messages = await db.Message.find()
      .sort({ createdAt: 'desc' })
      .populate('user', {
        username: true,
        profileImageUrl: true
      });
    return res.status(200).json(messages);
  } catch (err) {
    return next(err);
  };
});

app.use(notFoundErrorHandler);

app.use(genericErrorHandler);

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
