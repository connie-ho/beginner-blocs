import { screen } from '@testing-library/react';
import Minter from '../Minters';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '../../lib/test-utils';
// import toBeVisible from "@testing-library/jest-dom";
// import { expect } from 'chai';

describe('Minters', () => {
  const renderMinters = async (props) => {
    const view = renderWithProviders(<Minter {...props} />);
    const fakeFile = new File(['hello'], 'hello.png', { type: 'image/png' });

    return {
      ...view,
      fakeFile,
      // getStartedButton: screen.queryByRole('button', {name: /get started/i}),
      mintNFTButton: screen.getByRole('button', { name: /mint nft/i }),
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
    const nftName = screen.queryByPlaceholderText('NFT');
    userEvent.type(nftName, ':Test NFT:');
    // console.log(nftName);
    expect(nftName).not.toBeNull();
  });

  test('Check Description field', async () => {
    // const { nftName } = renderMinters();
    await renderMinters();
    const nftDesc = screen.queryByPlaceholderText('e.g. Even cooler than cryptokitties');
    userEvent.type(nftDesc, ':Test description:');
    // console.log(nftName);
    expect(nftDesc).not.toBeNull();
  });

  // function clickMintButton() {
  //     user.click(screen.getByRole('button', { name: /mint nft/i }));
  // }
  // test('should redirect the user when the get started button is clicked', async () => {
  //     const { getStartedButton } = await renderHome()
  //     userEvent.click(getStartedButton)
  //     expect(getStartedButton).toHaveAttribute('href', '/get-started');
  // })
});
