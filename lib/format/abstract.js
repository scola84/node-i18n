'use strict';

class AbstractFormat {
  constructor() {
    this.i18n = null;
  }

  getI18n() {
    return this.i18n;
  }

  setI18n(i18n) {
    this.i18n = i18n;
    return this;
  }

  format() {
    throw new Error('not_implemented');
  }

  parse() {
    throw new Error('not_implemented');
  }
}

module.exports = AbstractFormat;
