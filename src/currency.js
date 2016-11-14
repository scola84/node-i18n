import merge from 'lodash-es/merge';
import NumberFormat from './number';
import escape from './helper/escape';
import replace from './helper/replace';

export default class CurrencyFormat extends NumberFormat {
  format(value, locale = null, currency = {}, number = {}) {
    currency = merge({}, this._i18n.data(locale).currency, currency);

    return replace(currency.format[value < 0 ? 'n' : 'p'], {
      code: currency.code,
      symbol: currency.symbol,
      number: super.format(value, locale, number).replace('-', '')
    });
  }

  parse(value, locale = null, currency = {}, number = {}) {
    currency = merge({}, this._i18n.data(locale).currency, currency);

    let match = value.match(this._createRegExp(currency.format.n, currency));
    const sign = match ? '-' : '';

    match = match ||
      value.match(this._createRegExp(currency.format.p, currency));

    if (match) {
      return super.parse(sign + match[1].trim(), locale, number);
    }

    return NaN;
  }

  _createRegExp(format, options) {
    return new RegExp(escape(format)
      .replace(/\s*\\\{\\\{(symbol|code|number)\\\}\\\}\s*/g, (full, name) => {
        return name === 'number' ? '(.*)' : escape(options[name]) || '';
      }));
  }
}
