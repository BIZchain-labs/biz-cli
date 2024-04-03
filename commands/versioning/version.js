// version.js

const { version } = require("../../package.json");

async function getBlockNumber(rpc) {
    try {
        const number = await rpc.getBlockNumber();
        console.log("Current Block height is " + number);
    } catch (error) {
        console.error("Error getting block number:", error);
    }
}

module.exports = {
    getBlockNumber,
    version
};
