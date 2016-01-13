'use strict';

const lodashGet = require('lodash.get');
const lodashHas = require('lodash.has');
const lodashTemplate = require('lodash.template');
const AbstractFormat = require('./abstract');

class StringFormat extends AbstractFormat {
  constructor(data) {
    super();
    this.data = data;
  }

  format(value, values) {
    value = this.resolve(value);
    values = values || {};

    value = typeof value === 'object' ?
      value[values.number] || value.d || null :
      value;

    return lodashTemplate(value, {
      interpolate: /{{([\s\S]+?)}}/g
    })(values);
  }

  resolve(value) {
    const locale = this.i18n.getLocale();
    const [language] = locale.split('_');

    if (lodashHas(this.data, locale + '.' + value)) {
      value = lodashGet(this.data, locale + '.' + value);
    } else if (lodashHas(this.data, language + '.' + value)) {
      value = lodashGet(this.data, language + '.' + value);
    }

    return value;
  }
}

module.exports = StringFormat;