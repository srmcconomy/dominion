export default function(styles) {
  return function (classes, ...rest) {
    if (rest.length > 0) classes = [classes, ...rest];
    let keys;
    if (Array.isArray(classes)) keys = classes;
    else if (typeof classes === 'object') keys = Object.keys(classes);
    else return styles[classes];
    return keys.map(key => {
      if (classes[key] && styles.hasOwnProperty(key)) {
        return styles[key];
      }
      return '';
    }).join(' ');
  }
}
