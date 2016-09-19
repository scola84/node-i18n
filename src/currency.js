import NumberFormat from './number';
import escape from './helper/escape';
import replace from './helper/replace';

export default class CurrencyFormat extends NumberFormat {
  format(value, locale) {
    const data = this._i18n.data(locale).currency;

    return replace(data.format[value < 0 ? 'n' : 'p'], {
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
    return new RegExp(escape(format)
      .replace(/\s*\\\{\\\{(symbol|code|number)\\\}\\\}\s*/g, (full, name) => {
        return name === 'number' ? '(.*)' : escape(options[name]) || '';
      }));
  }
}
