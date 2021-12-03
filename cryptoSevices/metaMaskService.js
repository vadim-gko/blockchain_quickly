const Web3 = require("web3");

const ethEnabled = async () => {
  if (window.ethereum) {
    await window.ethereum.send('eth_requestAccounts');
    window.web3 = new Web3(window.ethereum);
    return true;
  }
  return false;
}

Promise.resolve(ethEnabled()).then(value => console.log(value))