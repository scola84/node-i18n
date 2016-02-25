'use strict';

const EventHandler = require('@scola/events');

class I18n extends EventHandler {
  constructor(format, data) {
    super();

    this.locale = null;
    this.timezone = null;

    this.format = format;
    this.data = data;
  }

  get(name) {
    return this
      .format[name]
      .get()
      .setI18n(this);
  }

  getData(locale) {
    return this.data[locale || this.getLocale()];
  }

  getLocale() {
    return this.locale;
  }

  setLocale(locale) {
    this.locale = locale;

    this.emit('locale', {
      data: this.getData(),
      locale
    });

    return this;
  }

  getTimezone() {
    return this.timezone;
  }

  setTimezone(timezone) {
    this.timezone = timezone;

    this.emit('timezone', {
      data: this.getData(),
      timezone
    });

    return this;
  }
}

module.exports = I18n;
