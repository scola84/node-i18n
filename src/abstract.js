export default class AbstractFormat {
  constructor() {
    this._i18n = null;
    this._locale = null;
    this._timezone = null;
  }

  i18n(value = null) {
    if (value === null) {
      return this._i18n;
    }

    this._i18n = value;
    return this;
  }

  locale(value = null) {
    if (value === null) {
      return this._locale;
    }

    this._locale = value;
    return this;
  }

  timezone(value = null) {
    if (value === null) {
      return this._timezone;
    }

    this._timezone = value;
    return this;
  }

  format() {
    throw new Error('Not implemented');
  }

  parse() {
    throw new Error('Not implemented');
  }
}
