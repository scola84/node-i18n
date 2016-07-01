import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';

export default {
  entry: 'index.js',
  format: 'cjs',
  globals: {
    'moment': 'moment',
    'moment-timezone': 'moment'
  },
  plugins: [
    resolve({
      jsnext: true,
      skip: ['moment', 'moment-timezone']
    }),
    babel({
      presets: ['es2015-rollup']
    })
  ]
};
