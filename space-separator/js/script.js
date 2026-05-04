function тысячи_разделителей(n, d) {
  let s = String(Math.abs(Math.trunc(n)));
  if (s.length > 4) {
    const p = [];
    while (s.length > 3) {
      p.unshift(s.slice(-3));
      s = s.slice(0, -3);
    }
    p.unshift(s);
    s = p.join(" ");
  }
  return (n < 0 ? "-" : "") + s + (d != null ? "," + d : "");
}

console.log(тысячи_разделителей(1000));
console.log(тысячи_разделителей(10000, 23));
console.log(тысячи_разделителей(100000));
