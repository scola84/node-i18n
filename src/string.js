import get from 'lodash-es/get';
import has from 'lodash-es/has';
import merge from 'lodash-es/merge';
import AbstractFormat from './abstract';
import replace from './helper/replace';

const data = {};

export default class StringFormat extends AbstractFormat {
  format(value, values, locale) {
    value = this.get(value, locale) || value;
    values = values || {};

    value = typeof value === 'object' ?
      value[values.index] || value.d || null :
      value;

    return replace(value, values);
  }

  get(value, locale) {
    locale = locale || this._locale;
    const [language] = locale.split('_');

    if (has(data, locale + '.' + value)) {
      return get(data, locale + '.' + value);
    } else if (has(data, language + '.' + value)) {
      return get(data, language + '.' + value);
    }

    return null;
  }

  static data(value) {
    merge(data, value);
  }
}
