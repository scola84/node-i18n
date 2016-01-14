'use strict';

const AbstractFormat = require('./abstract');

class NumberFormat extends AbstractFormat {
  format(value, locale) {
    if (/e/.test(value)) {
      return value;
    }

    const data = this.i18n.getData(locale).number;

    // Improved toFixed, see http://stackoverflow.com/a/23560569
    const number = Number(
      Math.round(value + 'e' + data.decimal.size) +
      'e-' +
      data.decimal.size
    ).toFixed(data.decimal.size);

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

    return sign + result + (fracPart ? data.decimal.symbol + fracPart : '');
  }

  parse(value, locale) {
    const data = this.i18n.getData(locale).number;
    const sign = value.substr(0, 1) === '-' ? '-' : '';

    const [intPart, fracPart = '0', overflow] = value
      .replace(sign, '')
      .split(data.decimal.symbol);

    const symbolIndex = data.group.symbol &&
      fracPart.indexOf(data.group.symbol);

    if (overflow || symbolIndex !== -1) {
      return NaN;
    }

    const groups = data.group.symbol ?
      intPart.split(data.group.symbol) : [intPart];

    const allGroupsAreCorrect = groups.every((group, index) => {
      if (!(/^\d+$/).test(group)) {
        return false;
      } else if (index === 0) {
        return group.length >= 1;
      } else if (index === groups.length - 1) {
        return group.length === (data.group.size === 2 ? 3 : data.group.size);
      }

      return group.length === data.group.size;
    });

    if (!allGroupsAreCorrect) {
      return NaN;
    }

    return parseFloat(sign + groups.join('') + '.' + fracPart);
  }
}

module.exports = NumberFormat;
