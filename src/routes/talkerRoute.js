const express = require('express');
const bodyParser = require('body-parser');

const data = require('../data');

const router = express.Router();
router.use(bodyParser.json());

const HTTP_OK_STATUS = 200;

router.get('/talker', async (req, res) => {
  const talkers = await data();
  res.status(HTTP_OK_STATUS).json(talkers);
});

router.get('/talker/:id', async (req, res) => {
  const talkers = await data();
  const { id } = req.params;
  const talkId = talkers.find((talker) => talker.id === Number(id));
  if (talkId) {
    res.status(HTTP_OK_STATUS).json(talkId);
  } else {
    res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }
});

module.exports = router;
