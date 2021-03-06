export default function useMessages() {
  const switchMessage = (type) => {
    let messages = {
      message: 'Try browsing the marketplace to find something for you!',
      type: 'Marketplace',
      link: '/',
    };
    if (type === 'created') {
      messages.message = 'Come back soon, or try creating an NFT below!';
      messages.type = 'Create NFT';
      return messages;
    } else if (type === 'listed') {
      messages.message = 'Come back soon, or try minting an NFT below!';
      messages.type = 'Create NFT';
      messages.link = '/create';
      return messages;
    } else {
      return messages;
    }
  };
  return { switchMessage };
}
