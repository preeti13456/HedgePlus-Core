const hplus_Contract = artifacts.require("HedgePlus")

module.exports = async (deployer,network,accounts) =>{
	deployer.deploy(hplus_Contract,accounts[2],accounts[3],accounts[4],accounts[5],accounts[6],accounts[6],accounts[6],accounts[6],accounts[1]);
};

// 0xf60d90F76bD89730C3095AD5a6f442d490238Eb5