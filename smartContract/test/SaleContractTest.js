
const SsafyToken = artifacts.require("SsafyToken");
const Nfast = artifacts.require("Nfast");
const SaleFactory = artifacts.require("SaleFactory");
const Sale = artifacts.require("Sale");
let ssafyTokenContract,
  salesFactoryContract,
  nfastContract,
  salesContract,
  salesContract2;
let itemId = 0;
let price = 20;
const { time } = require("@openzeppelin/test-helpers");

contract("Sale Contract Testing", (accounts) => {
  const mintAmount = 10000;
  const uri = "testURI";
  const seller = accounts[0];
  const buyer = accounts[1];
  const buyer2 = accounts[2];
  let nfsat;
  let token;
  let factory;
  let sale;

  async function print(title) {
    const seller = accounts[0];
    const bidder1 = accounts[1];
    const bidder2 = accounts[2];
    console.log(`\n--------------------  ${title} --------------------`);
    console.log(`Seller: ${seller} ${await getBalance(seller)}`);
    console.log(`Bidder1: ${bidder1} ${await getBalance(bidder1)}`);
    console.log(`Bidder2: ${bidder2} ${await getBalance(bidder2)}\n`);
  }

  before(async () => {
    nfast = await Nfast.new("test", "test2");
    nfastContract = await nfast.address;
    token = await SsafyToken.new("SSAFY", "SSF", 0);
    ssafyTokenContract = await token.address;
    factory = await SaleFactory.new(nfastContract, ssafyTokenContract);
    salesFactoryContract = await factory.address;
  });
  it("1_create sale", async () => {
    await nfast.create(
      seller,
      uri,
      seller,
      getTime(),
      false,
      getTime(),
      getTime(),
      20,
      10
    );
    assert.equal(seller, await getNftOwner(nfast), "create nft");

    await token.mint(3000);
    await token.transfer(seller, 1000);
    await token.transfer(buyer, 1000);
    await token.transfer(buyer2, 1000);
    assert.equal(1000, await token.balanceOf(buyer), "token transfer");

    salesContract = (
      await factory.createSale(1, price, getTime(), getTime() + 1000000)
    ).logs[0].address;
    assert.equal(salesContract, (await factory.allSales())[0], "create sale");
  });

  it("2_Purchase", async () => {
    await token.approve(salesContract, price, { from: buyer });
    await nfast.approve(salesContract, 1);

    sale = await Sale.at(salesContract);
    await sale.purchase({ from: buyer });
    assert.equal(buyer, await getNftOwner(nfast), "nft transfer");
  });

  it("3_refund", async () => {
    salesContract2 = (
      await factory.createSale(1, price + 10, getTime(), getTime() + 1000000, {
        from: buyer,
      })
    ).logs[0].address;

    await token.approve(salesContract2, price + 10, { from: buyer2 });
    await nfast.approve(salesContract2, 1, { from: buyer });

    sale = await Sale.at(salesContract2);
    await sale.purchase({ from: buyer2 });
    assert.equal(buyer2, await getNftOwner(nfast), "nft transfer");

    await token.approve(salesContract2, price, { from: seller });
    await sale.refund({ from: seller });
    console.log(await token.balanceOf(seller));
    console.log(await token.balanceOf(buyer));
    console.log(await token.balanceOf(buyer2));
    console.log(await token.balanceOf(salesContract));
    console.log(await token.balanceOf(salesContract2));
  });

  it("4_withdraw", async () => {
    sale = await Sale.at(salesContract2);
    await sale.withdraw({ from: buyer });
    console.log(await token.balanceOf(seller));
    console.log(await token.balanceOf(buyer));
    console.log(await token.balanceOf(buyer2));
    console.log(await token.balanceOf(salesContract));
    console.log(await token.balanceOf(salesContract2));
    let duration = time.duration.minutes(60000);
    await time.increase(duration);
    sale = await Sale.at(salesContract);
    await sale.withdraw({ from: seller });
    console.log(await token.balanceOf(seller));
    console.log(await token.balanceOf(buyer));
    console.log(await token.balanceOf(buyer2));
    console.log(await token.balanceOf(salesContract));
    console.log(await token.balanceOf(salesContract2));
  });

  function getTime() {
    const today = new Date(); // ⚠️ JS returns the value in miliseconds
    const mseconds = today.getTime(); // divided to get the just seconds
    const seconds = Math.floor(mseconds / 1000); // single liner
    return Math.floor(new Date().getTime() / 1000);
  }

  async function getNftOwner(nfast) {
    const tokenId = await nfast.current();
    return await nfast.ownerOf(tokenId);
  }
});
