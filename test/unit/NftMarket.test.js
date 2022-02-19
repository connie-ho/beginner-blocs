const { expect } = require('chai');

describe('NFTMarket', function () {
  let nftMarket = null;
  let nft = null;

  beforeEach(async () => {
    const Market = await ethers.getContractFactory('NFTMarket');
    nftMarket = await Market.deploy();
    await nftMarket.deployed();
    const marketContractAddress = nftMarket.address;

    /* deploy the NFT contract */
    const NFT = await ethers.getContractFactory('NFT');
    nft = await NFT.deploy(marketContractAddress);
    await nft.deployed();
    nftContractAddress = nft.address;
  });

  describe('getListingPrice', () => {
    it('should return the listing price of the contract', async () => {
      let listingPrice = await nftMarket.getListingPrice();
      listingPrice = listingPrice.toString();

      expect(listingPrice).to.equal(ethers.utils.parseUnits('0.025', 'ether').toString());
    });
  });

  describe('createMarketItem', () => {
    let listingPrice = null;
    let token = null;

    beforeEach(async () => {
      listingPrice = await nftMarket.getListingPrice();
      token = await nft.createToken('https://www.mytokenlocation.com');
    });

    it('should create an item for sale', async () => {
      const auctionPrice = ethers.utils.parseUnits('1', 'ether');
      await expect(nftMarket.createMarketItem(nftContractAddress, 1, auctionPrice, { value: listingPrice })).to.emit(
        nftMarket,
        'MarketItemCreated'
      );
    });

    it('should not create an item for sale if there is no price', async () => {
      const auctionPrice = ethers.utils.parseUnits('0', 'ether');
      await expect(nftMarket.createMarketItem(nftContractAddress, 0, auctionPrice, { value: listingPrice })).to.be
        .reverted;
    });

    it('should not create an item for sale if the listing price is not the same as the market place listing price', async () => {
      const auctionPrice = ethers.utils.parseUnits('1', 'ether');
      await expect(nftMarket.createMarketItem(nftContractAddress, 0, auctionPrice, { value: 0 })).to.be.reverted;
    });

    it('should not create an item for sale the owner is buying the item themselves', async () => {
      const auctionPrice = ethers.utils.parseUnits('1', 'ether');
      await expect(nftMarket.createMarketItem(nftContractAddress, 0, auctionPrice, { value: 0 })).to.be.reverted;
    });
  });

  describe('createMarketSale', () => {
    let listingPrice = '';
    let token = '';
    let auctionPrice = '';
    let buyerAddress = '';

    beforeEach(async () => {
      listingPrice = await nftMarket.getListingPrice();
      [_, buyerAddress] = await ethers.getSigners();
      token = await nft.createToken('https://www.mytokenlocation.com');
      auctionPrice = ethers.utils.parseUnits('2', 'ether');
      await nftMarket.createMarketItem(nftContractAddress, 1, auctionPrice, { value: listingPrice });
    });

    it('should create the sale of a marketplace item', async () => {
      const offerPrice = auctionPrice;
      await expect(nftMarket.connect(buyerAddress).createMarketSale(nftContractAddress, 1, { value: offerPrice })).not
        .to.be.reverted;
    });

    it('should not create the sale of a marketplace item if the price is not the same as the asking price', async () => {
      await expect(nftMarket.connect(buyerAddress).createMarketSale(nftContractAddress, 1)).to.be.reverted;
    });
  });
});
