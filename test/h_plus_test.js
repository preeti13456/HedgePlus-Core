
const ERC20 = artifacts.require("HedgePlus")


contract('HEDGE PLUS TOKEN TEST', (accounts) =>{
	let erc20Instance = null;

	before(async () => {
        erc20Instance = await ERC20.deployed();
	});

	//Testing the SWAN Token Contract
	it("Owner is Correct", async () => {
		const owner = await erc20Instance.owner();
		assert.equal(owner,accounts[0],"Owner's address is wrongly assigned");
	});

	it("Name of the token should be HedgePlus",async () => {
		const name = await erc20Instance.name();
		assert.equal(name,"HedgePlus","Name is wrongly assigned");
	})

	it("Symbol should be HPLUS", async () => {
		const symbol = await erc20Instance.symbol();
		assert.equal(symbol,"HPLUS","Token symbol is not correct")
	})

	it("Total Supply Should be 21000000000000000000000000", async () => {
		const totalSupply = await erc20Instance.totalSupply();
		assert.equal(totalSupply.toString(), '21000000000000000000000000',"Total Supply is wrongly assigned");
	})
	
	it("Minted tokens should be assigned to PrePublic", async () => {
		const totalTokens = await erc20Instance.balanceOf(accounts[2]);
		assert.equal(totalTokens.toString(), '6300000000000000000000000',"Tokens Minted doesn't match tokens owned by Contract")
	});

	it('Check Tokenomics and Balances of Distributed Tokens',async ()=>{
		const prePublicSale_balance = await erc20Instance.balanceOf(accounts[2]);
		const platForm_balance = await erc20Instance.balanceOf(accounts[3]);
		const Team_amount = await erc20Instance.balanceOf(accounts[4]);
		const operations_amount = await erc20Instance.balanceOf(accounts[5]);

		assert.equal(prePublicSale_balance.toString(), '6300000000000000000000000',"PrePublic} Minted doesn't match tokens owned by Contract")
		assert.equal(platForm_balance.toString(), '4200000000000000000000000',"Platform Minted doesn't match tokens owned by Contract")
		assert.equal(Team_amount.toString(), '2100000000000000000000000',"Team Minted doesn't match tokens owned by Contract")
		assert.equal(operations_amount.toString(), '2100000000000000000000000',"Operation Minted doesn't match tokens owned by Contract")

	})

	it("Transfer Tokens to a USER", async () => {
		const amount = 10000;
		
		const rec_balance_before = await erc20Instance.balanceOf(accounts[7]);
		await erc20Instance.transfer(accounts[7],amount,{from:accounts[2]})
		const rec_balance_after = await erc20Instance.balanceOf(accounts[7]);
		const marketBalance = await erc20Instance.balanceOf(accounts[1])

		assert.equal(rec_balance_before.toString(),"0","Balance is not Zero")
		assert.equal(rec_balance_after.toString(),"9800","Balance is not as_expected")
		assert.equal(marketBalance.toString(),"100","Market Balance is not as_expected")

	});

	it("BlackList an address", async ()=>{
		const address_array = [accounts[7]]
		const bool_before = await erc20Instance.isBlackListed(accounts[7]);
		await erc20Instance.blackListAddress(address_array);
		const bool_after = await erc20Instance.isBlackListed(accounts[7]);
		assert.equal(bool_after,true,"AFTER IS NOT TRUE")
		assert.equal(bool_before,false,"Before IS NOT FALSE")

	})
	it("Token Transfer to a BlackList address should not be EXECUTED", async () => {

		try{
			await erc20Instance.transfer(accounts[7],10000,{from:accounts[2]})
		}catch(error){
			const invalidOpcode = error.message.search("revert") >= 0 
			assert(invalidOpcode,"Expected revert, got '"+ error +"' instead");
		}
	});

	it("WhiteList an address", async ()=>{
		const address_array = [accounts[7]]
		const bool_before = await erc20Instance.isBlackListed(accounts[7]);
		await erc20Instance.whiteList(address_array);
		const bool_after = await erc20Instance.isBlackListed(accounts[7]);
		assert.equal(bool_after,false,"After IS NOT FALSE")
		assert.equal(bool_before,true,"Before IS NOT TRUE")

	})

	it("Transfer Tokens to a USER", async () => {
		const amount = 10000;
		
		const rec_balance_before = await erc20Instance.balanceOf(accounts[7]);
		await erc20Instance.transfer(accounts[7],amount,{from:accounts[2]})
		const rec_balance_after = await erc20Instance.balanceOf(accounts[7]);
		const marketBalance = await erc20Instance.balanceOf(accounts[1])

		assert.equal(rec_balance_before.toString(),"9800","Balance is not Zero")
		assert.equal(rec_balance_after.toString(),"19600","Balance is not as_expected")
		assert.equal(marketBalance.toString(),"200","Market Balance is not as_expected")

	});
	

})