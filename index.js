import 'regenerator-runtime/runtime'
const { ethers } = require("ethers");
const url = "https:rinkeby.infura.io/v3/20f0bb8628384d9a99783509a0de9d95";
const provider = new ethers.providers.JsonRpcProvider(url);

async function blockNumber() {
    const blockNumber = await provider.getBlockNumber();
    return blockNumber;
}

blockNumber().then(function(number){
  for (let i = 0; i < 10; i++){
    provider.getBlock(number - i).then(function (block){
      printBlock(block);
    });
  }
});
function printBlock(block){
  const table = document.getElementById('blocks');
  const row = table.insertRow(-1);
  const cell1 = row.insertCell(0);
  const cell2 = row.insertCell(1);
  const cell3 = row.insertCell(2);
  cell1.innerHTML = block.number;
  cell2.innerHTML = block.hash;
  cell3.innerHTML = block.timestamp;
}

module.exports = blockNumber;
