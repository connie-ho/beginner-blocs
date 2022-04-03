import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';
import { generateTestingUtils } from 'eth-testing';

const { provider } = generateTestingUtils({ providerType: 'MetaMask' });

global.beforeAll(() => {
  global.window.ethereum = provider;
});
