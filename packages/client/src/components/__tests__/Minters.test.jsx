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
      // getStartedButton: screen.queryByRole('button', {name: /get started/i}),
      // mintNFTButton: screen.getByRole('button', { name: /mint nft/i }),
      // nftName: screen.queryByTestId(/nameInput/i),
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
    // const inputFile = screen.getByTestId(/imageUpload/i);
    const imageField = screen.queryByTestId(/imageUpload/i);
    // console.log(inputFile);
    userEvent.upload(imageField, fakeFile);
    // console.log(imageField);
    expect(imageField.files).toHaveLength(1);
  });

  test('Check Name field', async () => {
    // const { nftName } = renderMinters();
    await renderMinters();
    const nftName = screen.queryByPlaceholderText('e.g. the Coolest NFT Ever!!');
    userEvent.type(nftName, ':Test NFT:');
    // console.log(nftName);
    expect(nftName).not.toBeNull();
  });

  test('Check Description field', async () => {
    // const { nftName } = renderMinters();
    await renderMinters();
    const nftDesc = screen.queryByPlaceholderText('e.g. Even cooler than cryptokitties');
    userEvent.type(nftDesc, ':Test description:');
    // console.log(nftDesc);
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
