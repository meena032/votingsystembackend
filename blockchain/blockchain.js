const { ethers } = require('ethers');
require('dotenv').config();

// Simulated storage (in real app: smart contract)
let blockchainStorage = [];

const saveAadharHash = async (hash) => {
    blockchainStorage.push(hash);
    console.log('Blockchain - Aadhaar hash saved:', hash);
};

module.exports = { saveAadharHash };
