const { Web3 } = require("web3");
require('dotenv').config();

var ETHEREUM_NETWORK = "sepolia";
const infuraApiKey = '2e23b3e27eab4efd99ad82e0f5bacfe4';
const infuraProvider = `https://${ETHEREUM_NETWORK}.infura.io/v3/${infuraApiKey}`;


const contractAddress = '0xaefC7c529128c4D8739ec0C55478f6e7de5C4482';

const privateKey = 'e3d900aee7a7645bcdd5330feb73b732cb38574c76ca9c99e9ad8bdf5dbb64ac';

const senderAddress = '0x75E551dCe2512ac68dA61eb224b4A346b7Aed709';

const web3 = new Web3(infuraProvider);

const contractABI = require("./Contract_ABI.json");

const myContract = new web3.eth.Contract(contractABI, contractAddress);


const txParams = {
  from: senderAddress,
  to: contractAddress,
  data: myContract.methods.getTransactionSenderAddress().encodeABI(),
  gas: 200000, // Adjust the gas limit accordingly
  gasPrice: '100000000000'
};

const main = async () => {
  try {
    const result = await myContract.methods.getTransactionReceiverAddress().call();

    // Log the result
    console.log("Transaction Sender:", result);

    // Now you can proceed with the transaction
    const signedTx = await web3.eth.accounts.signTransaction(txParams, privateKey);
    const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
    console.log(receipt);
    console.log("Transaction successful!");
  } catch (error) {
    console.error("Transaction failed:", error);
  }
};

main();