const { expect } = require('chai');
const { ethers } = require('hardhat');

describe('NFTMarket', function () {
  let nftMarket = null;
  let nft = null;
  let nftContractAddress = '';

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

    beforeEach(async () => {
      listingPrice = await nftMarket.getListingPrice();
      await nft.createToken('https://www.mytokenlocation.com');
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

    it('should not create the market place item if the lister and the owner are different people', async () => {
      const auctionPrice = ethers.utils.parseUnits('1', 'ether');
      const [_, secondAddress] = await ethers.getSigners();
      await expect(
        nftMarket.connect(secondAddress).createMarketItem(nftContractAddress, 1, auctionPrice, { value: listingPrice })
      ).to.be.reverted;
    });
  });

  describe('createMarketSale', () => {
    let listingPrice = '';
    let auctionPrice = '';
    let buyerAddress = '';
    let _firstAddress = '';

    beforeEach(async () => {
      listingPrice = await nftMarket.getListingPrice();
      [_firstAddress, buyerAddress] = await ethers.getSigners();
      await nft.createToken('https://www.mytokenlocation.com');
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

    it('should not create the sale of a marketplace item if the buyer and the seller are the same person', async () => {
      await expect(nftMarket.createMarketSale(nftContractAddress, 1)).to.be.reverted;
    });
  });

  describe('fetchItemByContractAddAndTokenID', () => {
    beforeEach(async () => {
      const listingPrice = await nftMarket.getListingPrice();
      const [_firstAddress] = await ethers.getSigners();
      await nft.createToken('https://www.mytokenlocation.com');
      const auctionPrice = ethers.utils.parseUnits('2', 'ether');
      await nftMarket.createMarketItem(nftContractAddress, 1, auctionPrice, { value: listingPrice });
    });

    it('Get item by contract address and token id', async () => {
      const auctionPrice = ethers.utils.parseUnits('2', 'ether').toString();

      const marketItem = await nftMarket.fetchItemByContractAddAndTokenID(nftContractAddress, 1);

      expect(marketItem.nftContract).to.equal(nftContractAddress);
      expect(marketItem.tokenId).to.equal(1);
      expect(marketItem.price).to.equal(auctionPrice);
      expect(marketItem.sold).to.equal(false);
    });

    it('throws error if item with given contract address and tokenId does not exist', async () => {
      await expect(nftMarket.fetchItemByContractAddAndTokenID(nftContractAddress, 5)).to.be.reverted;
    });
  });
});
