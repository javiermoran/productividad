import prettySeconds from 'pretty-seconds';

export default function prettySecondsEs(value) {
  let pretty = prettySeconds(value);
  pretty = pretty.replace('second', 'segundo');
  pretty = pretty.replace('minute', 'minuto');
  pretty = pretty.replace('hour', 'hora');
  pretty = pretty.replace('and', 'y');

  return pretty;
}