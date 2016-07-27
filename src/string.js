import { assign, get, has } from '@scola/deep';
import template from 'lodash-es/template.js';
import AbstractFormat from './abstract';

export default class SringFormat extends AbstractFormat {
  constructor(i18n) {
    super(i18n);
    this._data = {};
  }

  data(data) {
    assign(this._data, data);
  }

  format(value, values, locale) {
    value = this._resolve(value, locale);
    values = values || {};

    value = typeof value === 'object' ?
      value[values.number] || value.d || null :
      value;

    return template(value, {
      interpolate: /{([\s\S]+?)}/g
    })(values);
  }

  _resolve(value, locale) {
    locale = locale || this._i18n.locale();
    const [language] = locale.split('_');

    if (has(this._data, locale + '.' + value)) {
      value = get(this._data, locale + '.' + value);
    } else if (has(this._data, language + '.' + value)) {
      value = get(this._data, language + '.' + value);
    }

    return value;
  }
}
