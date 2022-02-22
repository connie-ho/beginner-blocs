import ProfileBanner from '../ProfileBanner'
import { renderWithProviders } from '../../../lib/test-utils'
import { randomHexString } from '@ethersproject/testcases'
import seedrandom from 'seedrandom';

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

describe('ProfileBanner', () => {
    const renderProfileBanner = async (props) => {
        const view = renderWithProviders(<ProfileBanner {...props} />)

        return {
            ...view
        }
    } 

    test('it renders', async() => {
        const { container } = await renderProfileBanner(mockProps)
        expect(container).toBeVisible()
    })

})