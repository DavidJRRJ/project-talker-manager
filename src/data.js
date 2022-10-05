const fs = require('fs/promises');
const path = require('path');

const data = async () => {
  try {
    const talkFile = path.resolve('src', 'talker.json');
    const talkers = JSON.parse(await fs.readFile(talkFile, 'utf-8'));
    return talkers;
  } catch (err) {
    console.log(err);
  }
};

module.exports = data;