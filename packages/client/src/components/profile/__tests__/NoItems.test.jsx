import { screen } from '@testing-library/react';
import { renderWithProviders } from '../../../lib/test-utils';
import NoItems from '../NoItems';

describe('AccountInfo', () => {
  const renderNoItems = async (props) => {
    const view = renderWithProviders(<NoItems {...props} />);

    return {
      ...view,
    };
  };

  test('it renders', async () => {
    const { container } = await renderNoItems({ type: 'owned' });
    expect(container).toBeVisible();
  });

  test('it displays the correct text for no items found', async () => {
    await renderNoItems({ type: 'owned' });
    expect(screen.getByText('No Items Found!', { exact: false })).toBeInTheDocument();
  });

  test('it displays the correct messages for the owned type', async () => {
    await renderNoItems({ type: 'owned' });
    expect(
      screen.getByText('Try browsing the marketplace to find something for you!', { exact: false })
    ).toBeInTheDocument();
    expect(screen.getByText('Marketplace')).toBeInTheDocument();
  });

  test('it displays the correct messages for the created type', async () => {
    await renderNoItems({ type: 'created' });
    expect(screen.getByText('Come back soon, or try creating an NFT below!', { exact: false })).toBeInTheDocument();
    expect(screen.getByText('Create NFT')).toBeInTheDocument();
  });

  test('it displays the correct messages for the listed type', async () => {
    await renderNoItems({ type: 'listed' });
    expect(screen.getByText('Come back soon, or try minting an NFT below!', { exact: false })).toBeInTheDocument();
    expect(screen.getByText('Create NFT')).toBeInTheDocument();
  });
});
