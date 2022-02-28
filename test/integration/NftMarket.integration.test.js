const { expect } = require('chai');
const { ethers } = require('hardhat');

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

    const [_myAddress, secondAddress] = await ethers.getSigners();

    /* create a couple of tokens */
    await nft.createToken('this is my token');
    await nft.createToken('this is another token of mine');
    await nft.connect(secondAddress).createToken('https://www.mytokenlocation.com');
    await nft.connect(secondAddress).createToken('https://www.mytokenlocation2.com');
    await nft.connect(secondAddress).createToken('https://www.mytokenlocation3.com');

    /* put tokens for sale */
    await market.createMarketItem(nftContractAddress, 1, auctionPrice, { value: listingPrice });
    await market.createMarketItem(nftContractAddress, 2, auctionPrice, { value: listingPrice });
    await market.connect(secondAddress).createMarketItem(nftContractAddress, 3, auctionPrice, { value: listingPrice });
    await market.connect(secondAddress).createMarketItem(nftContractAddress, 4, auctionPrice, { value: listingPrice });
    await market.connect(secondAddress).createMarketItem(nftContractAddress, 5, auctionPrice, { value: listingPrice });

    /* execute some sales */
    await market.connect(secondAddress).createMarketSale(nftContractAddress, 1, { value: auctionPrice });
    await market.createMarketSale(nftContractAddress, 3, { value: auctionPrice });

    /* query for and return the my purchased items */
    const purchasedItems = await market.fetchMyNFTs();
    const myPurchases = await Promise.all(
      purchasedItems.map(async (i) => {
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
    expect(myPurchases[0].tokenId).to.equal('3');

    /* query for and return the my created items */
    const listedItems = await market.fetchMyListedNFTs();
    const listedNfts = await Promise.all(
      listedItems.map(async (i) => {
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

    expect(listedNfts.length).to.equal(1);
    expect(listedNfts[0].tokenId).to.equal('2');

    // /* query for and return the unsold items */
    const marketItems = await market.fetchMarketItems();
    const unSoldItems = await Promise.all(
      marketItems.map(async (i) => {
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

    expect(unSoldItems.length).to.equal(3);
    expect(unSoldItems[0].tokenId).to.equal('2');
    expect(unSoldItems[1].tokenId).to.equal('4');
    expect(unSoldItems[2].tokenId).to.equal('5');
  });
});
