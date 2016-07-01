export default class AbstractFormat {
  constructor(i18n) {
    this._i18n = i18n;
  }

  format() {
    throw new Error('Not implemented');
  }

  parse() {
    throw new Error('Not implemented');
  }
}
