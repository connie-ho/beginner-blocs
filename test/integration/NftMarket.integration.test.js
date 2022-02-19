const { expect } = require('chai');

/* test/sample-test.js */
describe('NFTMarket', function () {
  it('Should create and execute market sales', async function () {
    /* deploy the marketplace */
    const Market = await ethers.getContractFactory('NFTMarket');
    const market = await Market.deploy();
    await market.deployed();
    const marketAddress = market.address;

    /* deploy the NFT contract */
    const NFT = await ethers.getContractFactory('NFT');
    const nft = await NFT.deploy(marketAddress);
    await nft.deployed();
    const nftContractAddress = nft.address;

    let listingPrice = await market.getListingPrice();
    listingPrice = listingPrice.toString();

    const auctionPrice = ethers.utils.parseUnits('1', 'ether');

    /* create three tokens */
    await nft.createToken('https://www.mytokenlocation.com');
    await nft.createToken('https://www.mytokenlocation2.com');
    await nft.createToken('https://www.mytokenlocation3.com');

    /* put both tokens for sale */
    await market.createMarketItem(nftContractAddress, 1, auctionPrice, { value: listingPrice });
    await market.createMarketItem(nftContractAddress, 2, auctionPrice, { value: listingPrice });
    await market.createMarketItem(nftContractAddress, 3, auctionPrice, { value: listingPrice });

    const [_, buyerAddress] = await ethers.getSigners();

    /* execute sale of token to self */
    await market.createMarketSale(nftContractAddress, 1, { value: auctionPrice });

    /* execute sale of token to another user */
    await market.connect(buyerAddress).createMarketSale(nftContractAddress, 2, { value: auctionPrice });

    /* query for and return the my purchased items */
    items = await market.fetchMyNFTs();
    const myPurchases = await Promise.all(
      items.map(async (i) => {
        const tokenUri = await nft.tokenURI(i.tokenId);
        let item = {
          price: i.price.toString(),
          tokenId: i.tokenId.toString(),
          seller: i.seller,
          owner: i.owner,
          tokenUri,
        };
        return item;
      })
    );

    expect(myPurchases.length).to.equal(1);
    expect(myPurchases[0].tokenId).to.equal('1');

    /* query for and return the my created items */
    items = await market.fetchItemsCreated();
    const itemsCreated = await Promise.all(
      items.map(async (i) => {
        const tokenUri = await nft.tokenURI(i.tokenId);
        let item = {
          price: i.price.toString(),
          tokenId: i.tokenId.toString(),
          seller: i.seller,
          owner: i.owner,
          tokenUri,
        };
        return item;
      })
    );

    expect(itemsCreated.length).to.equal(3);

    // /* query for and return the unsold items */
    items = await market.fetchMarketItems();
    const unSoldItems = await Promise.all(
      items.map(async (i) => {
        const tokenUri = await nft.tokenURI(i.tokenId);
        let item = {
          price: i.price.toString(),
          tokenId: i.tokenId.toString(),
          seller: i.seller,
          owner: i.owner,
          tokenUri,
        };
        return item;
      })
    );

    expect(unSoldItems.length).to.equal(1);
    expect(unSoldItems[0].tokenId).to.equal('3');
  });
});
