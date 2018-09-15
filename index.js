const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { genericErrorHandler, notFoundErrorHandler } = require('./handlers/error');

const PORT = process.env.PORT || 4000;

const app = express();
app.use(bodyParser.json());
app.use(cors());

// routes to come here

app.use(notFoundErrorHandler);

app.use(genericErrorHandler);

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
