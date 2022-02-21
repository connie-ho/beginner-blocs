import React from 'react';
import ReactDOM from 'react-dom';

import App from '../App';
import Providers from '../Providers';

jest.mock('react-dom', () => ({ render: jest.fn() }));

describe('Application root', () => {
  it('should render without crashing', async () => {
    const div = document.createElement('div');
    div.id = 'root';
    document.body.appendChild(div);
    require('../index.js');
    expect(ReactDOM.render).toHaveBeenCalledWith(
      <Providers>
        <App />
      </Providers>,
      div
    );
  });
});
