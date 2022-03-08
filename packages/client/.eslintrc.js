module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
    jest: true,
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  extends: ['eslint:recommended', 'plugin:react/recommended'],
  parserOptions: {
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: '2020',
  },
  plugins: ['react'],
  rules: {
    'no-unused-vars': [
      2,
      {
        args: 'after-used',
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
      },
    ],
    'react/no-unescaped-entities': 0,
    'react/prop-types': 0,
    'react/react-in-jsx-scope': 0,
  },
};
