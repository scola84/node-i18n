import get from 'lodash-es/get';
import has from 'lodash-es/has';
import merge from 'lodash-es/merge';
import AbstractFormat from './abstract';
import replace from './helper/replace';

export default class StringFormat extends AbstractFormat {
  constructor(i18n) {
    super(i18n);
    this._data = {};
  }

  data(value) {
    merge(this._data, value);
    return this;
  }

  format(value, values, locale) {
    value = this.get(value, locale) || value;
    values = values || {};

    value = typeof value === 'object' ?
      value[values.index] || value.d || null :
      value;

    return replace(value, values);
  }

  get(value, locale) {
    locale = locale || this._i18n.locale();
    const [language] = locale.split('_');

    if (has(this._data, locale + '.' + value)) {
      return get(this._data, locale + '.' + value);
    } else if (has(this._data, language + '.' + value)) {
      return get(this._data, language + '.' + value);
    }

    return null;
  }
}
