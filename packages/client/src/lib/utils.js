function parseImageURL(imageURL) {
  if (imageURL && imageURL.startsWith('ipfs://')) {
    imageURL = imageURL.replace('ipfs://', 'https://ipfs.io/');
  }

  return imageURL;
}

export { parseImageURL };
