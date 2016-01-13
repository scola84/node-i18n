'use strict';

const EventHandler = require('@scola/events');

class I18n extends EventHandler {
  constructor(config, format, data) {
    super();

    this.country = config.get('@scola.i18n.country');
    this.language = config.get('@scola.i18n.language');
    this.timezone = config.get('@scola.i18n.timezone');

    this.format = format;
    this.data = data;
  }

  get(name) {
    return this
      .format[name]
      .get()
      .setI18n(this);
  }

  getData() {
    return this.data[this.getLocale()];
  }

  getCountry() {
    return this.country;
  }

  setCountry(country) {
    this.country = country;

    this.emit('country', {
      country
    });

    return this;
  }

  getLanguage() {
    return this.language;
  }

  setLanguage(language) {
    this.language = language;

    this.emit('language', {
      language
    });

    return this;
  }

  getTimezone() {
    return this.timezone;
  }

  setTimezone(timezone) {
    this.timezone = timezone;

    this.emit('timezone', {
      timezone
    });

    return this;
  }

  getLocale() {
    return this.language + '_' + this.country;
  }
}

module.exports = I18n;
