import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';

import Transfer from '../Transfer';

const props = {
  transfer: jest.fn(),
};

beforeEach(() => {
  render(<Transfer transfer={props.transfer} />);
});

afterEach(() => {
  props.transfer.mockClear();
});

describe('Transfer', () => {
  test('it renders transfer component', async () => {
    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  test('it disables transfer button on incorrect address', async () => {
    const invalidAddresses = [
      '',
      'abcde',
      '0x408F3B8w148A9541507D444576EC5c1041CEdA1B',
      '0x408F3B8a148A9541507D444576EC5c1041CEdA1',
    ];
    for (const address of invalidAddresses) {
      fireEvent.change(screen.getByRole('textbox'), {
        target: { value: address },
      });
      expect(screen.getByRole('button')).toBeDisabled();
      expect(screen.getByText('Enter a valid Recipient Address')).toBeInTheDocument();
    }
  });

  test('it enables transfer button if address is correct', async () => {
    const validAddresses = ['0x408F3B8a148A9541507D444576EC5c1041CEdA1B', '408F3B8a148A9541507D444576EC5c1041CEdA1B'];
    for (const address of validAddresses) {
      fireEvent.change(screen.getByRole('textbox'), {
        target: { value: address },
      });

      expect(screen.getByRole('button')).toBeEnabled();
      expect(screen.queryByText('Enter a valid Recipient Address')).toBeNull();
    }
  });

  test(`it calls the provided transfer function with receipient address 
    when transfer button is clicked`, async () => {
    fireEvent.change(screen.getByRole('textbox'), {
      target: { value: '0x408F3B8a148A9541507D444576EC5c1041CEdA1B' },
    });

    fireEvent.click(screen.getByRole('button'));

    expect(props.transfer).toHaveBeenCalledWith('0x408F3B8a148A9541507D444576EC5c1041CEdA1B');
  });
});
