import get from 'lodash-es/get';
import has from 'lodash-es/has';
import merge from 'lodash-es/merge';
import template from 'lodash-es/template';
import AbstractFormat from './abstract';

export default class StringFormat extends AbstractFormat {
  constructor(i18n) {
    super(i18n);
    this._data = {};
  }

  data(data) {
    merge(this._data, data);
  }

  format(value, values, locale) {
    value = this.get(value, locale) || value;
    values = values || {};

    value = typeof value === 'object' ?
      value[values.number] || value.d || null :
      value;

    return template(value, {
      interpolate: /{([\s\S]+?)}/g
    })(values);
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
