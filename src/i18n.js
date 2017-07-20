/* eslint prefer-reflect: "off" */

import merge from 'lodash-es/merge';
import CurrencyFormat from './currency';
import DateFormat from './date';
import NumberFormat from './number';
import StringFormat from './string';
import packageData from '../data/data';

export default class I18n {
  constructor() {
    this._data = packageData;
    this._strings = {};

    this._locale = null;
    this._timezone = null;
  }

  data(value = null) {
    if (value === null) {
      return typeof this._data[this._locale] === 'undefined' ?
        null : this._data[this._locale];
    }

    if (typeof value === 'string') {
      return this._data[value];
    }

    merge(this._data, value);
    return this;
  }

  strings(value = null) {
    if (value === null) {
      return this._strings;
    }

    merge(this._strings, value);
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

  currency() {
    return new CurrencyFormat()
      .i18n(this);
  }

  date() {
    return new DateFormat()
      .i18n(this);
  }

  number() {
    return new NumberFormat()
      .i18n(this);
  }

  string() {
    return new StringFormat()
      .i18n(this);
  }
}
