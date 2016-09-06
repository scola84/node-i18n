import moment from 'moment';
import 'moment-timezone';
import AbstractFormat from './abstract';

export default class DateFormat extends AbstractFormat {
  format(dateValue, dateFormat, locale, timezone) {
    return this
      .moment(locale, timezone, dateValue)
      .format(dateFormat);
  }

  moment(locale, timezone, dateValue) {
    return moment(dateValue)
      .locale(locale || this._i18n.locale())
      .tz(timezone || this._i18n.timezone());
  }

  parse(dateValue, dateFormat, locale, timezone) {
    const result = moment.tz(
      dateValue,
      dateFormat,
      locale || this._i18n.locale(),
      true,
      timezone || this._i18n.timezone()
    );

    return result.isValid() ? result.toDate() : null;
  }
}
