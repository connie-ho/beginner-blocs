import { screen } from '@testing-library/react';
import { renderWithProviders } from '../../../lib/test-utils';
import { randomHexString } from '@ethersproject/testcases';
import seedrandom from 'seedrandom';
import AccountInfo from '../AccountInfo';
import userEvent from '@testing-library/user-event';

const seed = new seedrandom(`BEGINNERBLOCS${Math.random() * 100}`);

const mockProps = {
  account: randomHexString(seed, 0, 32),
  balance: 2.45,
};

describe('AccountInfo', () => {
  const renderAccountInfo = async (props) => {
    const view = renderWithProviders(<AccountInfo {...props} />);

    return {
      ...view,
    };
  };

  test('it renders', async () => {
    const { container } = await renderAccountInfo(mockProps);
    expect(container).toBeVisible();
  });

  test('it displays the correct Eth amount', async () => {
    await renderAccountInfo(mockProps);
    expect(screen.getByText('2.45 Eth', { exact: false })).toBeInTheDocument();
  });

  test('it displays a button for the wallet address', async () => {
    await renderAccountInfo(mockProps);
    const button = screen.getByTestId('acc-button');
    expect(button).not.toBeNull();
  });

  test('it copies when you click the account button, then closes the notification', async () => {
    await renderAccountInfo(mockProps);
    document.execCommand = jest.fn();
    const button = screen.getByTestId('acc-button');
    userEvent.click(button);
    expect(document.execCommand).toHaveBeenCalledWith('copy');
    const closeButton = screen.getByTestId('close-button');
    userEvent.click(closeButton);
  });
});
