import React from 'react';
import { cleanup } from '@testing-library/react';
import { renderWithProviders } from '../../lib/test-utils';
import FAQ from '../FAQ';

afterEach(cleanup);

describe('FAQ', () => {
    const renderFAQ = async (props) => {
        const view = renderWithProviders(<FAQ {...props} />);
        return {
            ...view,
        };
    };

    test('it renders without crashing', async () => {
        const {container} = await renderFAQ();
        expect(container).toBeVisible();
    });
});
