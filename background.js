const parseHSLProp = (prop) => {
  const x = getComputedStyle(document.documentElement).getPropertyValue(prop);
  const [h, s, l] = x.substring(x.indexOf('(')+1, x.indexOf(')')).trim().replaceAll('%', '').split(', ')

  function hslToHex(h, s, l) {
    l /= 100;
    const a = s * Math.min(l, 1 - l) / 100;
    const f = n => {
      const k = (n + h / 30) % 12;
      const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
      return Math.round(255 * color).toString(16).padStart(2, '0');   // convert to Hex and prefix "0" if needed
    };
    return `#${f(0)}${f(8)}${f(4)}`;
  }

  return hslToHex(parseInt(h), parseInt(s), parseInt(l))
}

VANTA.TOPOLOGY({
  el: ".bg",
  mouseControls: true,
  touchControls: true,
  gyroControls: false,
  minHeight: 200.00,
  minWidth: 200.00,
  scale: 1.00,
  scaleMobile: 1.00,
  color: parseHSLProp('--color-slate-regular'),
  backgroundColor: parseHSLProp('--color-navy-regular')
})