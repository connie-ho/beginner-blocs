import { screen } from '@testing-library/react';
import Minter from '../Minters';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '../../lib/test-utils';
import * as useInteract from '../../hooks/use-interact';

describe('Minters', () => {
  const renderMinters = async (props) => {
    const view = renderWithProviders(<Minter {...props} />);
    const fakeFile = new File(['hello'], 'hello.png', { type: 'image/png' });

    return {
      ...view,
      fakeFile,
    };
  };

  test('it renders', async () => {
    const { container } = await renderMinters();
    expect(container).toBeVisible();
  });

  test('User File Upload', async () => {
    const { fakeFile } = await renderMinters();
    jest.spyOn(global, 'FileReader').mockImplementation(function () {
      this.readAsDataURL = jest.fn();
    });
    const imageField = screen.queryByTestId(/imageUpload/i);
    userEvent.upload(imageField, fakeFile);
    expect(imageField.files).toHaveLength(1);
  });

  test('Check Name field', async () => {
    await renderMinters();
    const nftName = screen.queryByPlaceholderText('e.g. the Coolest NFT Ever!!');
    userEvent.type(nftName, ':Test NFT:');
    expect(nftName).not.toBeNull();
  });

  test('Check Description field', async () => {
    await renderMinters();
    const nftDesc = screen.queryByPlaceholderText('e.g. Even cooler than cryptokitties');
    userEvent.type(nftDesc, ':Test description:');
    expect(nftDesc).not.toBeNull();
  });

  test('Press Mint Button', async () => {
    const mintNFTspy = jest.fn().mockResolvedValue({ success: true, status: 'Test Status' });

    jest.spyOn(useInteract, 'useInteract').mockReturnValue({
      mintNFT: mintNFTspy,
    });
    await renderMinters();
    const mintButton = screen.queryByTestId('mintButton');
    userEvent.click(mintButton);
    expect(await mintNFTspy).toHaveBeenCalled();
  });
});
