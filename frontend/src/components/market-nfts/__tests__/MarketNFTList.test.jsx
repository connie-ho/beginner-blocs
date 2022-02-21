import { screen } from '@testing-library/react';

import { renderWithProviders } from '../../../lib/renderwithProviders';
import { createTestNft } from '../../../lib/test/helper/nft';
import * as useGetNFTs from '../../../hooks/use-get-nfts';

import MarketNFTList from '../MarketNFTList';

describe('MarketNftList', () => {
    const renderMarketNFTList = (props) => {
        const view = renderWithProviders(<MarketNFTList {...props} />)

        return {
            ...view,
            $findMarketItems: async () => screen.findAllByTestId(/^market-item-/),
        }
    } 

    test('it renders', async() => {
        const { container } = await renderMarketNFTList()
        expect(container).toBeVisible()
    })

    test('should display a list of market nfts', async() => {

        const nft1 = await createTestNft()
        const nft2 = await createTestNft({tokenId: 2})
        const nfts = [nft1, nft2]
    
        const mockLoadNFTs = jest.fn().mockResolvedValue(nfts)
    
        jest.spyOn(useGetNFTs, 'useGetNFTs').mockReturnValue({
            loadNFTs: mockLoadNFTs,
        });
        const { $findMarketItems } = await renderMarketNFTList();
        const marketItems = await $findMarketItems()

        expect(marketItems).toHaveLength(2)
    })
})