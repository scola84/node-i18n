import get from 'lodash-es/get';
import has from 'lodash-es/has';
import AbstractFormat from './abstract';
import replace from './helper/replace';

export default class StringFormat extends AbstractFormat {
  format(value, values = {}, locale = null) {
    let string = this.get(value, locale) || value;

    string = typeof string === 'object' ?
      string[values.index] || value.d || value :
      string;

    return replace(string, values);
  }

  get(value, locale = null) {
    locale = locale || this._locale;

    const [language] = locale.split('_');
    const strings = this._i18n.strings();

    if (has(strings, locale + '.' + value) === true) {
      return get(strings, locale + '.' + value);
    } else if (has(strings, language + '.' + value) === true) {
      return get(strings, language + '.' + value);
    }

    return null;
  }
}
