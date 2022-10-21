import Web3 from "web3";
// import HDWalletProvider from "@truffle/hdwallet-provider";
const INFURA = "https://rinkeby.infura.io/v3/7639521ca4d84a36a041ef2c4ba488d1";
// const MNEMONIC = "about level boss tiny anchor slender stumble erupt dragon caution lock seed";
// const provider = new HDWalletProvider(MNEMONIC, INFURA);
// const web3 = new Web3(provider)
let web3;

if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
    window.ethereum.request({ method: "eth_requestAccounts" });
    web3 = new Web3(window.ethereum);
} else {
    const provider = new Web3.providers.HttpProvider(INFURA);
    web3 = new Web3(provider);
}
 
export default web3;