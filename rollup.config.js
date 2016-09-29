import buble from 'rollup-plugin-buble';
import resolve from 'rollup-plugin-node-resolve';

export default {
  dest: './dist/i18n.js',
  entry: 'index.js',
  format: 'cjs',
  external: [
    'events',
    'moment',
    'moment-timezone'
  ],
  plugins: [
    resolve({
      jsnext: true
    }),
    buble()
  ]
};
