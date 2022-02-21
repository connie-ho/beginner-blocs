import { ethers } from 'ethers';
import { randomHexString } from '@ethersproject/testcases';
import seedrandom from 'seedrandom';

export const createTestNft = (data) => {
  const tokenId = data?.tokenId ?? 1;
  const seed = new seedrandom(`BEGINNERBLOCS${tokenId}`);

  const sellerPrivateKey = randomHexString(seed, 0, 32);
  const sellerWallet = new ethers.Wallet(sellerPrivateKey);

  const ownerPrivateKey = randomHexString(seed, 0, 32);
  const ownerWallet = new ethers.Wallet(ownerPrivateKey);

  return {
    tokenId: tokenId,
    price: ethers.utils.parseUnits('1', 'ether').toString(),
    seller: sellerWallet.address,
    owner: ownerWallet.address,
    tokenUri: `randomuri-${tokenId}.com`,
    ...data,
  };
};
