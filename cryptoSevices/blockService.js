// Alternative is Ethers.js
// Source https://ethereumdev.io/
const Web3 = require("web3");

// const web3 = new Web3('http://localhost:7545');
const web3 = new Web3("https://cloudflare-eth.com");

/**
 *
 * @returns latest block number
 */

// web3.eth.getBlockNumber(function (err, result) {
//     console.log(result)
// })

async function getBlockNumber() {
  const latestBlockNumber = await web3.eth.getBlockNumber();
  console.log(latestBlockNumber);
  return latestBlockNumber;
}

/**
 * Listem new blocks
 */
let latestKnownBlockNumber = -1;
const blockTime = 5000;

async function processBlock(blockNumber) {
  console.log("We process block: " + blockNumber);
  latestKnownBlockNumber = blockNumber;
}

async function checkCurrentBlock() {
  const currentBlockNumber = await web3.eth.getBlockNumber();
  // "Script is at:" means that we check step-by step but "currentBlockNumber" can be higher because of
  console.log(
    "Current blockchain top: " + currentBlockNumber,
    " | Script is at: " + latestKnownBlockNumber
  );
  while (
    latestKnownBlockNumber == -1 ||
    currentBlockNumber > latestKnownBlockNumber
  ) {
    await processBlock(
      latestKnownBlockNumber == -1
        ? currentBlockNumber
        : latestKnownBlockNumber + 1
    );
  }
}

function startCheckCurrentBlock() {
  setInterval(checkCurrentBlock, blockTime);
}

/**
 * Get block 
 *  @param {string} blockNumber - number of block
 *  @returns all info about block
 * {
  baseFeePerGas: 114561527115,
  difficulty: '11180502019279928',
  extraData: '0xd883010a08846765746888676f312e31362e35856c696e7578',
  gasLimit: 29999972,
  gasUsed: 4974734,
  hash: '0x9f4872421ae25e13dddf827f8c97217eb4417a49dc9d838cdcb4fc0f6e711733',
  logsBloom: '0x082045020100...',
  miner: '0xB7e390864a90b7b923C9f9310C6F98aafE43F707',
  mixHash: '0x16e6cf0ec3abcbc714eae2e5e8dc76c6a6fbb6986631d7dde153db562fe3408d',
  nonce: '0x2e62f60116a457cc',
  number: 13720116,
  parentHash: '0x463ac9e04c281e9836e3d13d60f244f9bb400f1367720fe73faec8324ed52e68',
  receiptsRoot: '0xad948d0176416bab277258aea035c7062366bd329cf9324251f86e176bb4abfe',
  sha3Uncles: '0x1dcc4de8dec75d7aab85b567b6ccd41ad312451b948a7413f0a142fd40d49347',
  size: 23723,
  stateRoot: '0xbb53092d50cda5a85e5091876f631d851a9854d98ac07f22d34eeb68835c7a71',
  timestamp: 1638348839,
  totalDifficulty: '35588293923784312952975',
  transactions: [
    '0x165a29b179b925754e9bb1c608ac67206ce5c5e0033449940d0312d495a183ec',
    ...
  ],
  transactionsRoot: '0x0ebc0c2f474d489d4138ddbc996980e0a087e789983a0c4841167265a67ec024',
  uncles: []
}
 */

async function getBlockInfo(blockNumber) {
  const block = await web3.eth.getBlock(blockNumber);
  console.log("New block info: ", block);
  return block;
}

/**
 *
 * @param {string} block
 * @returns {array} transactions
 */
async function getAllTransactionsInfo(blockNumber) {
const block = await web3.eth.getBlock(blockNumber);
  const allTransactions = [];
  try {
    for (const transactionHash of block.transactions) {
      let transaction = await web3.eth.getTransaction(transactionHash);
      let transactionReceipt = await web3.eth.getTransactionReceipt(
        transactionHash
      );
      console.log(transaction)
      transaction = Object.assign(transaction, transactionReceipt);
      allTransactions.push(transactionReceipt);
    }
  } catch (err) {}
  console.log("Transactions ", allTransactions);
  return allTransactions;
}

// getBlockNumber()
// startCheckCurrentBlock();
// getBlockInfo('13720116')
getAllTransactionsInfo('13720116');
