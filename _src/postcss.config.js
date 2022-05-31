'use strict'

module.exports = () => ({
  map: false,
  plugins: {
    autoprefixer: {
      cascade: false
    }
  },
  rules: {
    exclude: '/node_modules/',
  }
});
