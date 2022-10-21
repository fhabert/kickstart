const ganache = require('ganache');
const assert = require("assert");
const Web3 = require("web3");
const web3 = new Web3(ganache.provider());

const compiledFactory = require("../build/CampaignFactory.json");
const compiledCampaign = require("../build/Campaign.json");

let accounts;
let factory;
let campaignAddress;
let campaign;

beforeEach(async () => {
    accounts = await web3.eth.getAccounts();
    factory = await new web3.eth.Contract(compiledFactory["abi"])
        .deploy({ data: compiledFactory["evm"]["bytecode"].object })
        .send({ from: accounts[0], gas: "10000000"})
    await factory.methods.createCampaign("100").send({ from: accounts[0], gas:"1000000" });
    let addresses = await factory.methods.getDeployedCampaigns().call();
    campaignAddress = addresses[0];
    campaign = await new web3.eth.Contract(compiledCampaign["abi"], campaignAddress);
})

describe("Campaigns", async () => {
    // it("deploys a factory", () => {
    //     assert.ok(factory.options.address);
    //     assert.ok(campaign.options.address);
    // });
    it("marks caller as manager", async () => {
        const owner =  await campaign.methods.manager().call();
        assert.equal(accounts[0], owner);
    });
    // it("can contribute and be approved", async () => {
    //     await campaign.methods.contribute().send({ from: accounts[1], gas: "30000000", value:"200" })
    //     const count = await campaign.methods.approversCount().call();
    //     const contributor = await campaign.methods.approvers(accounts[1]).call();
    //     console.log(contributor);
    //     assert.ok(contributor);
    // });
    // it("has a minimum contribution", async () => {
    //     try {
    //         await campaign.methods.contribute().send({
    //             from: accounts[1],
    //             gas: "1000000"
    //         });
    //         assert(false);
    //     } catch(err) {
    //         assert(err);
    //     }
    // });
    it("allows a manager to make a payment request", async () => {
        await campaign.methods.contribute().send({ from: accounts[0], gas: "30000000", value:"200" })
        await campaign.methods.creatRequest("request", 300, accounts[0]).send({ from: accounts[0], gas:"10000000"});
        const request = await campaign.methods.requests(0).call();
        assert.equal(request.description, "request");
    });
    it("process requests", async () => {
        await campaign.methods.contribute().send({ from: accounts[0], gas: "1000000" });
        await campaign.methods.creatRequest("request", 400, accounts[1]).send({ from: accounts[0], gas: "1000000" });
        await campaign.methods.approveRequest(0).send({ from: accounts[0], gas: "1000000" });
        await campaign.methods.finalizeRequest(0).send({ from: accounts[0], gas: "1000000" });
        let balance = await web3.eth.getBalance(accounts[1]);
        balance = web3.utils.fromWei(balance, "eth");
        balance = parseFloat(balance);
        assert(balance > 105);
    })
})