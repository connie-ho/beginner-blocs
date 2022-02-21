import { screen } from '@testing-library/react';

import { renderWithProviders } from '../../../lib/renderwithProviders';
import { createTestNft } from '../../../lib/test/helper/nft';
import * as useGetNFTs from '../../../hooks/use-get-nfts';

import MarketNFTList from '../MarketNFTList';

describe('MarketNftList', () => {
    const renderComponent = (props) => {
        const view = () => renderWithProviders(<MarketNFTList {...props} />)

        return {
            ...view,
            $findMarketItems: () => screen.findAllByTestId(/^market-item-/),
            $findGrid: () => screen.queryByTestId('grid')
        }
    } 

    test('should display a list of market nfts', async() => {
        const nft1 = await createTestNft()
        const nft2 = await createTestNft({tokenId: 2})
        const nfts = [nft1, nft2]

        jest.spyOn(useGetNFTs, 'useGetNFTs').mockReturnValue({
            loadNFTs: jest.fn().mockResolvedValue(nfts)
        });

        const { $findGrid } = renderComponent();
        expect($findGrid()).toBeVisible();
        // const marketItems = await $findMarketItems()    

        // expect(marketItems).toBeVisible();


    })
})