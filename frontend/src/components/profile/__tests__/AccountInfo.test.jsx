import { screen, fireEvent } from '@testing-library/react';
import { renderWithProviders } from '../../../lib/test-utils';
import { randomHexString } from '@ethersproject/testcases';
import seedrandom from 'seedrandom';
import AccountInfo from '../AccountInfo';

const seed = new seedrandom(`BEGINNERBLOCS${Math.random()*100}`);

const mockProps = {
  account: randomHexString(seed,0,32),
  balance: 2.45
}

describe('AccountInfo', () => {
    const renderAccountInfo = async (props) => {
        const view = renderWithProviders(<AccountInfo {...props} />)

        return {
            ...view
        }
    } 

    test('it renders', async() => {
        const { container } = await renderAccountInfo(mockProps)
        expect(container).toBeVisible()
    })

    test('it displays the correct Eth amount', async() => {
      const { getByText } = await renderAccountInfo(mockProps)
      expect(getByText("2.45 Eth", {exact: false})).toBeInTheDocument();
    })

    test('it displays a clickable button for the wallet address', async() => {
      const copyText = jest.fn()
      const {getByText} = await renderAccountInfo(mockProps)
      const button = screen.getByTestId('acc-button')
      fireEvent.click(button)
      expect(getByText("Wallet address copied")).toBeInTheDocument();

    })

})