import web3 from "../web3.js";
import CampaignFactory from "../build/CampaignFactory.json" assert { type: 'json' };

const instance = new web3.eth.Contract(
    JSON.parse(JSON.stringify(CampaignFactory["abi"])), "0x250838FC48a3b2d3f585632126Be0064c64a472F"
)

export default instance;
