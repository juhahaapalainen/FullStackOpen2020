module.exports = {
  'env': {
    'browser': true,
    'es2021': true,
    'mocha': true,
    'jest': true,
    'cypress/globals': true
  },
  'extends': [
    'eslint:recommended',
    'plugin:react/recommended'
  ],
  'parserOptions': {
    'ecmaFeatures': {
      'jsx': true
    },
    'ecmaVersion': 12,
    'sourceType': 'module'
  },
  'plugins': [
    'react', 'jest', 'cypress'
  ],
  'rules': {
    'indent': ['error',2],
    'linebreak-style': ['error','windows'],
    'quotes': ['error','single'],
    'semi': ['error','never'],
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'off'
  }
}
