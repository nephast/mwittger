require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { genericErrorHandler, notFoundErrorHandler } = require('./handlers/error');
const authRoutes = require('./routes/auth');
const messagesRoutes = require('./routes/messages');
const { loginRequired, authorisedUser } = require('./middleware/auth');

const PORT = process.env.PORT || 4000;

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.use('/api/auth', authRoutes);
app.use('/api/users/:id/messages', loginRequired, authorisedUser, messagesRoutes);

app.use(notFoundErrorHandler);

app.use(genericErrorHandler);

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
