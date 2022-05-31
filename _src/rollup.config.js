'use strict'

import { resolve } from 'path'

// Rollup Configuration.
const rollupConfig = {
  input: resolve('./_src/app.js'),
  output: {
    file: resolve('./js/app.js'),
    format: 'umd',
    name: 'app'
  }
};

export default rollupConfig;
