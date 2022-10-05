const fs = require('fs').promises;
// const path = require('path');

const data = require('./data');

async function updateData(id, upData) {
  const oldData = await data();
  const dataId = { id: Number(id), ...upData };
  const updatedData = oldData.reduce((acc, curr) => {
    if (curr.id === Number(dataId.id)) return [...acc, dataId];
    return [...acc, curr];
  }, []);

  const alldata = JSON.stringify(updatedData);
  console.log(alldata);
  try {
    await fs.writeFile(`${__dirname}/talker.json`, alldata);
    // console(`Atualizou o palestrante com o id: ${id}`);
  } catch (err) {
    console.error(`Erro na escrita do arquivo: ${err}`);
  }
}

module.exports = updateData;