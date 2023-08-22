const NftCreator = artifacts.require("Nfast");

contract("NftCreator", (accounts) => {
  it("NFT mint, transfer, and compare URI", async () => {

    const sender = accounts[0];
    const receiver = accounts[1];
    const storeAddress = accounts[2];
    const tokenURI = "https://example.com/nft";
    const ssafyNFT = await NftCreator.new("test", "test2");

    const today = new Date(); // ⚠️ JS returns the value in miliseconds
    const mseconds = today.getTime(); // divided to get the just seconds
    const seconds = Math.floor(mseconds / 1000); // single liner
    const dateInSecs = Math.floor(new Date().getTime() / 1000);

    console.log("--------------------");
    console.log(
      await ssafyNFT.create(
        sender,
        tokenURI,
        storeAddress,
        dateInSecs,
        false,
        dateInSecs,
        dateInSecs,
        20,
        10
      )
    );
    console.log("--------------------");

    const tokenId = await ssafyNFT.current();
    assert.equal(tokenId, 1, "NFT Mint Failed1");
    var owner = await ssafyNFT.ownerOf(tokenId);
    assert.equal(storeAddress, owner, "NFT Mint Failed2");
    const tokenURIFetched = await ssafyNFT.getTokenURI(tokenId);
    assert.equal(tokenURI, tokenURIFetched, "Wrong Token Id or URI.4");
  });
});
