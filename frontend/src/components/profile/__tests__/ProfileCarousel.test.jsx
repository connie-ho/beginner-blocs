import { screen } from '@testing-library/react';
import { renderWithProviders } from '../../../lib/test-utils';
import { randomHexString } from '@ethersproject/testcases';
import seedrandom from 'seedrandom';

import ProfileCarousel from '../ProfileCarousel';

const seed = new seedrandom(`BEGINNERBLOCS${Math.random()*100}`);

const mockProps = {
  nfts: [
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
    {
      address:randomHexString(seed, 0, 32),
      description: "N/A",
      image: "",
      name: "N/A",
      owner: randomHexString(seed, 0, 32),
      tokenId: Math.random()*100
    }
    
  ]
}

describe('ProfileCarousel', () => {
    const renderProfileCarousel = async (props) => {
        const view = renderWithProviders(<ProfileCarousel {...props} />)

        return {
            ...view,
            $findCarouselItems: async () => screen.findAllByTestId(/^carousel-item/),
        }
    } 

    test('it renders correctly', async() => {
        const { container } = await renderProfileCarousel(mockProps)
        expect(container).toBeVisible()
    })

    test('should show nothing if no valid NFTs are found', async() => {

      const noValidNFTS = {
        nfts:[{
          address:randomHexString(seed, 0, 32),
          description: "N/A",
          image: "",
          name: "N/A",
          owner: randomHexString(seed, 0, 32),
          tokenId: Math.random()*100
        }]
      }

      const { container } = await renderProfileCarousel(noValidNFTS);
      expect(container).toBeEmptyDOMElement()
  })
})