import ProfileBanner from '../ProfileBanner'
import { renderWithProviders } from '../../../lib/test-utils'
import { createTestNft } from '../../../lib/test/helper/nft';

describe('ProfileBanner', () => {

  const nft1 = createTestNft()
  const nft2 = createTestNft({tokenId: 2})
  const nfts = [nft1, nft2]
  
  const mockProps = {nfts: nfts}

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