const express = require('express');
const bodyParser = require('body-parser');

const data = require('../data');
const validateAge = require('../middlewares/talker/validateAge');
const validateName = require('../middlewares/talker/validateName');
const validateRate = require('../middlewares/talker/validateRate');
const validateTalk = require('../middlewares/talker/validateTalk');
const validateToken = require('../middlewares/talker/validateToken');
const validateWatchedat = require('../middlewares/talker/validateWatchedat');
const writeData = require('../writeData');
const updateData = require('../updateData');
const deleteData = require('../deleteData');

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

router.post(
  '/talker',
  validateToken,
  validateAge,
  validateName,
  validateTalk,
  validateRate,
  validateWatchedat,
  async (req, res) => {
    const newTalker = req.body;
    const newData = await writeData(newTalker);

    res.status(201).json(newData);
  },
);

router.put(
  '/talker/:id',
  validateToken,
  validateAge,
  validateName,
  validateTalk,
  validateRate,
  validateWatchedat,
  async (req, res) => {
    const { id } = req.params;
    const updateTalker = req.body;
    const dataId = { id: Number(id), ...updateTalker };
    await updateData(id, updateTalker);
    console.log(dataId);
    res.status(HTTP_OK_STATUS).json(dataId);
  },
);

router.delete(
  '/talker/:id',
  validateToken,
  async (req, res) => {
    const { id } = req.params;
    await deleteData(Number(id));

    res.status(204).end();
  },
);

module.exports = router;
