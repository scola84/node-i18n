import moment from 'moment-timezone';
import AbstractFormat from './abstract';

export default class DateFormat extends AbstractFormat {
  format(dateValue, dateFormat, locale, timezone) {
    locale = locale || this._locale;
    timezone = timezone || this._timezone;

    return this
      .moment(dateValue, locale, timezone)
      .format(dateFormat);
  }

  moment(dateValue, locale, timezone) {
    locale = locale || this._locale;
    timezone = timezone || this._timezone;

    return moment(dateValue)
      .locale(locale)
      .tz(timezone);
  }

  parse(dateValue, dateFormat, locale, timezone) {
    locale = locale || this._locale;
    timezone = timezone || this._timezone;

    const result = moment.tz(
      dateValue,
      dateFormat,
      locale,
      true,
      timezone
    );

    return result.isValid() === true ? result.toDate() : null;
  }
}
