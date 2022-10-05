const fs = require('fs/promises');
const path = require('path');
const data = require('./data');

async function writeData(newData) {
  try {
    const oldData = await data();
    const newDataId = { id: oldData.length + 1, ...newData };
    const allData = JSON.stringify([...oldData, newDataId]);

    await fs.writeFile(path.resolve('src', 'talker.json'), allData);
    return newDataId;
  } catch (err) {
    console.error(`Erro na escrita do arquivo: ${err}`);
  }
}

module.exports = writeData;