const createNFTMetaData = (data) => {
  return {
    image: 'image.png',
    name: 'Test',
    description: 'I am a test NFT',
    ...data,
  };
};

export { createNFTMetaData };
