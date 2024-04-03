const valabi = require('../abi/val.json');
const { contracts,ethers } = require('../config/config');

async function getValidators(rpc) {
    try { 
        const valContract = new ethers.Contract(contracts.validator, valabi, rpc);
        const validators = await valContract.getActiveValidators();
        console.log("Current Validators:");
        validators.forEach((validator, index) => {
            console.log(`${index + 1}. ${validator}`);
        });
        return validators;
    } catch (error) {
        console.error("Error fetching validators:", error);
        return null;
    }
}

module.exports = {
    getValidators
};
