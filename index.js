import I18n from './src/i18n';
import data from './data/data';

let instance = null;

export default function i18n() {
  if (!instance) {
    instance = new I18n();
    instance.data(data);
  }

  return instance;
}
