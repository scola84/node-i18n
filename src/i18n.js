/* eslint prefer-reflect: "off" */

import merge from 'lodash-es/merge';
import { EventEmitter } from '@scola/events';
import CurrencyFormat from './currency';
import DateFormat from './date';
import NumberFormat from './number';
import StringFormat from './string';
import packageData from '../data/data';

export default class I18n extends EventEmitter {
  constructor() {
    super();

    this._data = packageData;

    this._locale = null;
    this._timezone = null;

    this._currency = null;
    this._date = null;
    this._number = null;
    this._string = null;
  }

  data(value) {
    if (typeof value === 'undefined') {
      return this._data[this._locale];
    }

    if (typeof data === 'string') {
      return this._data[value];
    }

    merge(this._data, value);
    return this;
  }

  locale(value) {
    if (typeof value === 'undefined') {
      return this._locale;
    }

    this._locale = value;

    this.emit('change', {
      locale: value
    });

    return this;
  }

  timezone(value) {
    if (typeof value === 'undefined') {
      return this._timezone;
    }

    this._timezone = value;

    this.emit('change', {
      timezone: value
    });

    return this;
  }

  currency() {
    if (!this._currency) {
      this._currency = new CurrencyFormat(this);
    }

    return this._currency;
  }

  date() {
    if (!this._date) {
      this._date = new DateFormat(this);
    }

    return this._date;
  }

  number() {
    if (!this._number) {
      this._number = new NumberFormat(this);
    }

    return this._number;
  }

  string() {
    if (!this._string) {
      this._string = new StringFormat(this);
    }

    return this._string;
  }
}
