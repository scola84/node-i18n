import moment from 'moment';
import 'moment-timezone';
import AbstractFormat from './abstract';

export default class DateFormat extends AbstractFormat {
  format(value, format, locale, timezone) {
    return this
      .moment(locale, timezone, value)
      .format(format);
  }

  moment(locale, timezone, value) {
    return moment(value)
      .locale(locale || this._i18n.locale())
      .tz(timezone || this._i18n.timezone());
  }

  parse(value, format, locale, timezone) {
    const result = moment.tz(
      value,
      format,
      locale || this._i18n.locale(),
      true,
      timezone || this._i18n.timezone()
    );

    return result.isValid() ? result.toDate() : null;
  }
}
