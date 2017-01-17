import get from 'lodash-es/get';
import has from 'lodash-es/has';
import AbstractFormat from './abstract';
import replace from './helper/replace';

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
    const strings = this._i18n.strings();

    if (has(strings, locale + '.' + value)) {
      return get(strings, locale + '.' + value);
    } else if (has(strings, language + '.' + value)) {
      return get(strings, language + '.' + value);
    }

    return null;
  }
}
