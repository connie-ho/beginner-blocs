import { render, screen, fireEvent } from '@testing-library/react';

import List from '../List';

const props = {
  list: jest.fn(),
};

beforeEach(() => {
  render(<List list={props.list} />);
});

afterEach(() => {
  props.list.mockClear();
});

describe('List', () => {
  test('it renders the component correctly', async () => {
    expect(screen.getByRole('spinbutton')).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  test('it disables list button and shows error message on wrong price input', async () => {
    const invalidPrices = [0, -1, -0.1, 'abc'];
    for (const price of invalidPrices) {
      fireEvent.change(screen.getByRole('spinbutton'), {
        target: { value: price },
      });
      expect(screen.getByRole('button')).toBeDisabled();
      expect(screen.getByText('Enter a valid price')).toBeInTheDocument();
    }
  });

  test('it enables list button on valid price input', async () => {
    fireEvent.change(screen.getByRole('spinbutton'), {
      target: { value: 1 },
    });

    expect(screen.getByRole('button')).toBeEnabled();
  });

  test('it calls list function when clicked on the list button', async () => {
    fireEvent.change(screen.getByRole('spinbutton'), {
      target: { value: 1 },
    });
    fireEvent.click(screen.getByRole('button'));

    expect(props.list).toHaveBeenCalledWith('1');
  });
});
