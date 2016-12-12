import moment from 'moment-timezone';
import AbstractFormat from './abstract';

export default class DateFormat extends AbstractFormat {
  format(dateValue, dateFormat, locale, timezone) {
    return this
      .moment(dateValue, locale, timezone)
      .format(dateFormat);
  }

  moment(dateValue, locale, timezone) {
    return moment(dateValue)
      .locale(locale || this._locale)
      .tz(timezone || this._timezone);
  }

  parse(dateValue, dateFormat, locale, timezone) {
    const result = moment.tz(
      dateValue,
      dateFormat,
      locale || this._locale,
      true,
      timezone || this._timezone
    );

    return result.isValid() ? result.toDate() : null;
  }
}
