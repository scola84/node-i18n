export default class AbstractFormat {
  constructor() {
    this._i18n = null;
  }

  i18n(value = null) {
    if (value === null) {
      return this._i18n;
    }

    this._i18n = value;
    return this;
  }

  _locale() {
    return this._i18n.locale();
  }

  _timezone() {
    return this._i18n.timezone();
  }

  format() {
    throw new Error('Not implemented');
  }

  parse() {
    throw new Error('Not implemented');
  }
}
