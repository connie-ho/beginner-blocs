import { renderHook, act } from '@testing-library/react-hooks';
import { generateTestingUtils } from 'eth-testing';
import { useInteract } from '../use-interact';

jest.setTimeout(10000);

describe('useInteract Test', () => {
  const name_0 = '';
  const image_0 = '';
  const description_0 = '';
  const mintNFT = jest.fn();

  const testingUtils = generateTestingUtils({ providerType: 'MetaMask' });
  beforeAll(() => {
    // Manually inject the mocked provider in the window as MetaMask does
    global.window.ethereum = testingUtils.getProvider();
    testingUtils.mockChainId('0x3');
    testingUtils.mockRequestAccounts(['0xf61B443A155b07D2b2cAeA2d99715dC84E839EEf']);
    testingUtils.mockConnectedWallet(['0xf61B443A155b07D2b2cAeA2d99715dC84E839EEf']);
  });
  test(`mintNFT empty input test`, async () => {
    const mock_result = { success: false, status: '❗Please make sure all fields are completed before minting.' };
    const { result } = renderHook(() => useInteract({ mintNFT }));
    await act(async () => {
      const res = await result.current.mintNFT(name_0, image_0, description_0);
      // console.log(res)
      expect(res.success).equals(mock_result.success);
      expect(res.status).equals(mock_result.status);
    });
  });

  test(`mintNFT input test`, async () => {
    const name_1 = 'Test Name';
    const image_1 = 'Test_Image';
    const description_1 = 'Test_Description';

    const metadata = {};
    metadata.name = name_1;
    metadata.image = image_1;
    metadata.description = description_1;

    const mock_result = {
      success: true,
      status: '✅ Check out your transaction on Etherscan: https://ropsten.etherscan.io/tx/undefined',
    };

    const { result } = renderHook(() => useInteract({ mintNFT }));
    await act(async () => {
      const res = await result.current.mintNFT(name_1, image_1, description_1);
      console.log(res);
      expect(res.success).equals(mock_result.success);
      expect(res.status).equals(mock_result.status);
    });
  });
});
