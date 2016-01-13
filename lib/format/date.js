'use strict';

const AbstractFormat = require('./abstract');

class DateFormat extends AbstractFormat {
  constructor(moment) {
    super();
    this.moment = moment;
  }

  format(value, format) {
    return this.moment(value)
      .locale(this.i18n.getLanguage())
      .tz(this.i18n.getTimezone())
      .format(format);
  }

  parse(value, format) {
    const result = this.moment.tz(
      value,
      format,
      this.i18n.getLocale(),
      true,
      this.i18n.getTimezone()
    );

    return result.isValid() ? result.toDate() : null;
  }
}

module.exports = DateFormat;
