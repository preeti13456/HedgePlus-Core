const hplus_Contract = artifacts.require("HedgePlus")

module.exports = async (deployer,network,accounts) =>{
	deployer.deploy(hplus_Contract,accounts[2],accounts[3],accounts[4],accounts[5],accounts[6],accounts[6],accounts[6],accounts[6],accounts[1]);
};

// 0x47ED0545B7DF9896305d9bCd3761C493b19E8d20