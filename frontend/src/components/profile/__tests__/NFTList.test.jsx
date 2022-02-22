import { screen } from '@testing-library/react';
import { renderWithProviders } from '../../../lib/test-utils';
import { randomHexString } from '@ethersproject/testcases';
import seedrandom from 'seedrandom';

import NFTList from '../NFTList';

const seed = new seedrandom(`BEGINNERBLOCS${Math.random()*100}`);

const mockProps = {
  items: [
    {
      address:randomHexString(seed, 0, 32),
      description: "Test",
      image: "",
      name: "Test NFT",
      owner: randomHexString(seed, 0, 32),
      tokenId: Math.random()*100
    },
    {
      address:randomHexString(seed, 0, 32),
      description: "Test",
      image: "",
      name: "Test NFT",
      owner: randomHexString(seed, 0, 32),
      tokenId: Math.random()*100
    },
    
  ],
  type: 'owned'
}

describe('NFTList', () => {
    const renderNFTList = async (props) => {
        const view = renderWithProviders(<NFTList {...props} />)

        return {
            ...view,
            $findNFTItems: async () => screen.findAllByTestId(/^nft-item-/),
        }
    } 

    test('it renders', async() => {
        const { container } = await renderNFTList(mockProps)
        expect(container).toBeVisible()
    })

    test('should display a list of nfts items', async() => {
        const { $findNFTItems } = await renderNFTList(mockProps);
        const NFTItems = await $findNFTItems()
        expect(NFTItems).toHaveLength(2)
    })

    test('should display a message if no items are found', async() => {
      await renderNFTList({items:[], type:'owned'});
      expect(screen.getByText("No Items Found!")).toBeInTheDocument();
  })
})