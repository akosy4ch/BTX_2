const { Web3 } = require("web3");

const ETHEREUM_NETWORK = "sepolia";
const infuraApiKey = '05bcbc5e482f433aa3cc5336c285d813';
const infuraProvider = https://${ETHEREUM_NETWORK}.infura.io/v3/${infuraApiKey};

const privateKey = 'd8598ef717f8effd1401a7e536b9c035d41fde82ef3a2acc7a765346869f0779';
const senderAddress = '0x598E79A4f2bE09a86F27eA8cFb0b0B1DAb0ed970';

const web3 = new Web3(infuraProvider);

const contractABI = require("./constants/ContactABI");
const contractAddress = "0x7bc06186ef6EFDF994D798C185737A371dc4deEE";

const myContract = new web3.eth.Contract(contractABI, contractAddress);

const txParams = {
  from: senderAddress,
  to: contractAddress,
  data: myContract.methods.getTransactionSender().encodeABI(),
  gas: 200000, // Adjust the gas limit accordingly
  gasPrice: '100000000000'
};

const main = async () => {
  try {
    // Call getTransactionReceiver() function
    const result = await myContract.methods.getTransactionSender().call();

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