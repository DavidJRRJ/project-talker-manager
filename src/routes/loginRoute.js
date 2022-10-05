const express = require('express');
const bodyParser = require('body-parser');
const randomstring = require('randomstring');
// const data = require('../data');
const validateLogin = require('../middlewares/validateLogin');

const router = express.Router();
router.use(bodyParser.json());

const HTTP_OK_STATUS = 200;

router.post('/login', validateLogin, (req, res) => {
  const token = randomstring.generate(16);
  res.status(HTTP_OK_STATUS).send({ token });
});

module.exports = router;