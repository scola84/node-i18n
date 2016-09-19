// http://phpjs.org/functions/preg_quote/

export default function escape(value) {
  return String(value)
    .replace(new RegExp('[.\\\\+*?\\[\\^\\]$(){}=!<>|:-]', 'g'), '\\$&');
}
