'use strict';

const moment = require('moment-timezone');
require('./node_modules/moment/min/locales.min.js');

const Configuration = require('@scola/config');
const DI = require('@scola/di');

const I18n = require('./lib/i18n');

const CurrencyFormat = require('./lib/format/currency');
const DateFormat = require('./lib/format/date');
const NumberFormat = require('./lib/format/number');
const StringFormat = require('./lib/format/string');

const data = require('./lib/data');

class Module extends DI.Module {
  configure() {
    this.inject(I18n).with(
      this.singleton(Configuration),
      this.object({
        currency: this.instance(CurrencyFormat),
        date: this.instance(DateFormat),
        number: this.instance(NumberFormat),
        string: this.instance(StringFormat)
      }),
      this.object(data)
    );

    this.inject(StringFormat).with(
      this.object({})
    );

    this.inject(DateFormat).with(
      this.value(moment)
    );
  }
}

module.exports = {
  CurrencyFormat,
  DateFormat,
  I18n,
  Module,
  NumberFormat,
  StringFormat
};