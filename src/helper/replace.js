import escape from './escape';

export default function replace(value, values) {
  const matches = value.match(/{([\s\S]+?)}/g);

  let index = null;
  let placeholder = null;
  let replacement = null;

  if (matches !== null) {
    matches.forEach((match) => {
      index = match.substring(1, match.length - 1);
      placeholder = new RegExp(escape(match), 'g');
      replacement = typeof values[index] === 'undefined' ?
        '' : values[index];
      value = value.replace(placeholder, replacement);
    });
  }

  return value;
}
