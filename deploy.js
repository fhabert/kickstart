const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');
const compiledFactory = require("./build/CampaignFactory.json");
const compiledCampaign = require("./build/Campaign.json");
const { INFURA, MNEMONIC } = require('./env.js');

// let campaignAbi = compiledCampaign["abi"]
let factoryAbi = compiledFactory["abi"];
let factoryBytecode = compiledFactory["evm"]["bytecode"].object;

const provider = new HDWalletProvider(MNEMONIC,INFURA);
const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log('Attempting to deploy from account', accounts[0]);

  const result = await new web3.eth.Contract(factoryAbi)
    .deploy({ data: factoryBytecode })
    .send({ gas: '10000000', from: accounts[0] });
  console.log('Contract deployed to', result.options.address);
  provider.engine.stop();
};
deploy();
