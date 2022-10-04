const express = require('express');
const bodyParser = require('body-parser');
// const fs = require('fs').promises;
const randomstring = require('randomstring');
const data = require('./data.js');
const validateLogin = require('./middlewares/validateLogin');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});

// Primeiro Requisito
app.get('/talker', async (req, res) => {
  const talkers = await data();
  res.status(HTTP_OK_STATUS).json(talkers);
});

// Segundo Requisito
app.get('/talker/:id', async (req, res) => {
  const talkers = await data();
  const { id } = req.params;
  const talkId = talkers.find((talker) => talker.id === Number(id));
  if (talkId) {
    res.status(HTTP_OK_STATUS).json(talkId);
  } else {
    res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }
});

// Terceiro Requisito
app.post('/login', validateLogin, (req, res) => {
  const token = randomstring.generate(16);
  res.status(HTTP_OK_STATUS).send({ token });
});