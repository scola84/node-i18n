// import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';

export default {
  entry: 'index.js',
  format: 'cjs',
  plugins: [
    resolve({
      jsnext: true,
      preferBuiltins: false,
      skip: ['moment', 'moment-timezone']
    }),
    commonjs({
      exclude: ['**/lodash-es/**']
    })
  ]
};
