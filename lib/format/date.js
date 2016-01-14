'use strict';

const AbstractFormat = require('./abstract');

class DateFormat extends AbstractFormat {
  constructor(moment) {
    super();
    this.moment = moment;
  }

  format(value, format, locale, timezone) {
    return this.moment(value)
      .locale(locale || this.i18n.getLocale())
      .tz(timezone || this.i18n.getTimezone())
      .format(format);
  }

  parse(value, format, locale, timezone) {
    const result = this.moment.tz(
      value,
      format,
      locale || this.i18n.getLocale(),
      true,
      timezone || this.i18n.getTimezone()
    );

    return result.isValid() ? result.toDate() : null;
  }
}

module.exports = DateFormat;
