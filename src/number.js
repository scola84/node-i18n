import merge from 'lodash-es/merge';
import AbstractFormat from './abstract';

export default class NumberFormat extends AbstractFormat {
  format(value, locale = null, data = {}) {
    if (/e/.test(value) === true) {
      return value;
    }

    locale = locale || this._locale();
    data = merge({}, this._i18n.data(locale).number, data);

    const number = this.toFixed(value, data.decimal.size);
    const sign = number[0] === '-' ? '-' : '';
    const [intPart, fracPart = ''] = number.replace(sign, '').split('.');

    const firstGroupLength = data.group.size === 2 ?
      data.group.size + 1 :
      data.group.size;

    let result = intPart.slice(-firstGroupLength);

    for (let i = result.length; i < intPart.length; i += 1) {
      if (i % data.group.size === (data.group.size === 2 ? 1 : 0)) {
        result = data.group.symbol + result;
      }

      result = intPart[intPart.length - 1 - i] + result;
    }

    return sign + result + (fracPart.length > 0 ?
      data.decimal.symbol + fracPart : '');
  }

  parse(value, locale = null, data = {}) {
    locale = locale || this._locale();
    data = merge({}, this._i18n.data(locale).number, data);
    const sign = value.substr(0, 1) === '-' ? '-' : '';

    const [intPart, fracPart = '0', overflow] = value
      .replace(sign, '')
      .split(data.decimal.symbol);

    const symbolIndex = typeof data.group.symbol === 'string' ?
      fracPart.indexOf(data.group.symbol) : 0;

    if (overflow || symbolIndex > -1) {
      return NaN;
    }

    const groups = typeof data.group.symbol === 'string' ?
      intPart.split(data.group.symbol) : [intPart];

    const allGroupsAreCorrect = groups.every((group, index) => {
      if ((/^\d+$/).test(group) === false) {
        return false;
      } else if (index === 0) {
        return group.length >= 1;
      } else if (index === groups.length - 1) {
        return group.length === (data.group.size === 2 ?
          3 : data.group.size);
      }

      return group.length === data.group.size;
    });

    if (allGroupsAreCorrect === false) {
      return NaN;
    }

    return parseFloat(sign + groups.join('') + '.' + fracPart);
  }

  toFixed(value, size) {
    // Improved toFixed, see http://stackoverflow.com/a/23560569
    return Number(Math.round(value + 'e' + size) + 'e-' + size)
      .toFixed(size);
  }
}
