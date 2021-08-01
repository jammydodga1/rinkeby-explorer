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
  const cell4 = row.insertCell(3);
  const cell5 = row.insertCell(4);
  const cell6 = row.insertCell(5);
  cell1.innerHTML = block.number;
  cell1.onclick = function () {
    localStorage.setItem("myValue", block.number);
    window.location.href = "http://localhost:1234/block-page.html";
  };
  cell2.innerHTML = time2TimeAgo(block.timestamp)
  cell3.innerHTML = block.transactions.length;
  cell4.innerHTML = block.miner;
  cell5.innerHTML = block.gasUsed;
  cell6.innerHTML = block.gasLimit;
}


module.exports = blockNumber;



function time2TimeAgo(ts) {
    var d=new Date();
    var nowTs = Math.floor(d.getTime()/1000);
    var seconds = nowTs-ts;

    if (seconds > 2*24*3600) {
       return "a few days ago";
    }
    if (seconds > 24*3600) {
       return "yesterday";
    }

    if (seconds > 3600) {
       return "a few hours ago";
    }
    if (seconds > 1800) {
       return "Half an hour ago";
    }
    if (seconds > 60) {
       return Math.floor(seconds/60) + " minutes ago";
    }
    if (seconds < 60) {
       return Math.floor(seconds) + " seconds ago";
     }
}

// document.getElementById("block").onclick = function () {
//   location.href = "http://localhost:1234/block-page.html";
// };
