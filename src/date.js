import moment from 'moment';
import 'moment-timezone';
import AbstractFormat from './abstract';

export default class NumberFormat extends AbstractFormat {
  format(value, format, locale, timezone) {
    return moment(value)
      .locale(locale || this._i18n.locale())
      .tz(timezone || this._i18n.timezone())
      .format(format);
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
