const { ethers } = require('ethers');

const tprovider = new ethers.JsonRpcProvider("https://rpc-testnet.bizex.io/");
const Mprovider = new ethers.JsonRpcProvider("https://rpc-testnet.bizex.io/")
const rpc = {
    testnet: tprovider,
    mainnet: Mprovider
};

const contracts = {
    validator:"0x000000000000000000000000000000000000f000",
    punish:"0x000000000000000000000000000000000000F001",
    propose : "0x000000000000000000000000000000000000F002"

}


module.exports = {
    rpc,
    ethers,
    contracts
};
