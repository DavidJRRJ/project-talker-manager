const fs = require('fs').promises;
const data = require('./data');

async function deleteData(id) {
  const oldData = await data();
  const delData = oldData.filter((currentData) => currentData.id !== id);
  
  const updatedData = JSON.stringify(delData);

  try {
    await fs.writeFile(`${__dirname}/talker.json`, updatedData);
    console.log(`Deletou o palestrante com o od: ${id}`);
  } catch (err) {
    console.error(`Erro na escrita do arquivo: ${err}`);
  }
}

module.exports = deleteData;