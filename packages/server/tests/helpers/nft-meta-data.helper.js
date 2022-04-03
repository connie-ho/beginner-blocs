const createNFTMetaData = () => {
  return {
    data: {
      metadata: {
        metadata: {
          image: 'image.png',
          name: 'Test',
          description: 'I am a test NFT',
        },
      },
      tokenUrl: {
        gateway: 'https://boop23918.com',
      },
    },
  };
};

const createNFTs = () => {
  return {
    data: {
      ownedNfts: [
        {
          contract: {
            address: '123',
          },
          id: {
            tokenId: '333',
          },
          title: 'test title',
          description: 'test desc',
          tokenUri: 'beep',
          metaData: {
            image: 'test image',
            name: 'test name',
            description: 'test description',
          },
        },
      ],
    },
  };
};
export { createNFTMetaData, createNFTs };
