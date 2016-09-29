import buble from 'rollup-plugin-buble';

export default {
  entry: 'index.js',
  dest: './dist/i18n.js',
  format: 'cjs',
  external: [
    '@scola/events',
    'lodash-es/get',
    'lodash-es/has',
    'lodash-es/merge',
    'moment',
    'moment-timezone'
  ],
  plugins: [
    buble()
  ]
};
