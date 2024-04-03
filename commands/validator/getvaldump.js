// validatorDetailsComponent.js

const fs = require('fs');

// Function to fill the template JSON with provided values and export as validatordetails.json
function fillValidatorDetails({ name, feeAddress, moniker, identity, website, email, details,privatkey }) {
    // Check if required fields are filled
    if (!name || !feeAddress || !moniker || !identity || !website || !email || !details || !privatkey) {
        console.error("Error: Please provide all required fields.");
        return;
    }

    // Load the template JSON file
    const templateData = require('./template.json');

    // Fill in the template with provided values
    templateData.name = name;
    templateData.feeAddr = feeAddress;
    templateData.moniker = moniker;
    templateData.identity = identity;
    templateData.website = website;
    templateData.email = email;
    templateData.details = details;
    templateData.privkey = privatkey;

    // Export the filled JSON as validatordetails.json
    fs.writeFileSync('validatordetails.json', JSON.stringify(templateData, null, 2));
    
    console.log('Validator details filled and exported successfully.');
}

module.exports = {fillValidatorDetails};
