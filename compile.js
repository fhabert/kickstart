const path = require("path");
const fs = require("fs-extra");
const solc = require("solc");

const buildPath = path.resolve(__dirname, "build");
fs.removeSync(buildPath);

const campaignPath = path.resolve(__dirname, "contracts", "Campaign.sol");
const source = fs.readFileSync(campaignPath, "utf8");

let input = {
    language: 'Solidity',
    sources: {
        'Inbox.sol' : {
            content: source
        }
    },
    settings: {
        outputSelection: {
            '*': {
                '*': [ '*' ]
            }
        }
    }
};

let lot = JSON.parse(solc.compile(JSON.stringify(input)))
let output = lot.contracts['Inbox.sol'];

fs.ensureDirSync(buildPath);

for (let contract in output) {
    fs.outputJSONSync(path.resolve(buildPath, contract.replace(':', '') + '.json'), output[contract]);
    console.log(contract);
}

