import buble from 'rollup-plugin-buble';
import resolve from 'rollup-plugin-node-resolve';

export default {
  entry: 'index.js',
  dest: './dist/i18n.js',
  format: 'cjs',
  external: [
    'events',
    'moment',
    'moment-timezone'
  ],
  plugins: [
    buble(),
    resolve({
      'jsnext:main': true
    })
  ]
};
