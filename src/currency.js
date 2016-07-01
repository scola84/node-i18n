import template from 'lodash-es/template.js';
import NumberFormat from './number';

export default class CurrencyFormat extends NumberFormat {
  format(value, locale) {
    const data = this._i18n.data(locale).currency;

    return template(data.format[value < 0 ? 'n' : 'p'], {
      interpolate: /{{([\s\S]+?)}}/g
    })({
      code: data.code,
      symbol: data.symbol,
      number: super.format(value).replace('-', '')
    });
  }

  parse(value, locale) {
    const data = this._i18n.data(locale).currency;
    let match = value.match(this._createRegExp(data.format.n, data));
    const sign = match ? '-' : '';

    match = match || value.match(this._createRegExp(data.format.p, data));

    if (match) {
      return super.parse(sign + match[1].trim());
    }

    return NaN;
  }

  _createRegExp(format, options) {
    return new RegExp(this._escapeRegExp(format)
      .replace(/\s*\\\{\\\{(symbol|code|number)\\\}\\\}\s*/g, (full, name) => {
        return name === 'number' ?
          '(.*)' :
          this._escapeRegExp(options[name]) || '';
      }));
  }

  _escapeRegExp(value) {
    // http://phpjs.org/functions/preg_quote/
    return String(value)
      .replace(new RegExp('[.\\\\+*?\\[\\^\\]$(){}=!<>|:-]', 'g'), '\\$&');
  }
}
