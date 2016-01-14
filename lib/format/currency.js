'use strict';

const lodashTemplate = require('lodash.template');
const NumberFormat = require('./number');

class CurrencyFormat extends NumberFormat {
  format(value, locale) {
    const data = this.i18n.getData(locale).currency;

    return lodashTemplate(data.format[value < 0 ? 'n' : 'p'], {
      interpolate: /{{([\s\S]+?)}}/g
    })({
      code: data.code,
      symbol: data.symbol,
      number: super.format(value).replace('-', '')
    });
  }

  parse(value, locale) {
    const data = this.i18n.getData(locale).currency;
    let match = value.match(this.createRegExp(data.format.n, data));
    const sign = match ? '-' : '';

    match = match || value.match(this.createRegExp(data.format.p, data));

    if (match) {
      return super.parse(sign + match[1].trim());
    }

    return NaN;
  }

  createRegExp(format, options) {
    return new RegExp(this.escapeRegExp(format)
      .replace(/\s*\\\{\\\{(symbol|code|number)\\\}\\\}\s*/g, (full, name) => {
        return name === 'number' ?
          '(.*)' :
          this.escapeRegExp(options[name]) || '';
      }));
  }

  escapeRegExp(value) {
    // http://phpjs.org/functions/preg_quote/
    return String(value)
      .replace(new RegExp('[.\\\\+*?\\[\\^\\]$(){}=!<>|:-]', 'g'), '\\$&');
  }
}

module.exports = CurrencyFormat;
