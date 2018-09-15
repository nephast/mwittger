const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const PORT = process.env.PORT || 4000;

const app = express();
app.use(bodyParser.json());
app.use(cors());

// routes to come here

app.use((req, res, next) => {
  let err = new Error('Resource not found');
  err.status = 404;
  return next(err);
});

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
