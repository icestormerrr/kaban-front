export function invertColor(hex: string): string {
  let r = parseInt(hex.slice(0, 2), 16);
  let g = parseInt(hex.slice(2, 4), 16);
  let b = parseInt(hex.slice(4, 6), 16);

  r = 255 - r;
  g = 255 - g;
  b = 255 - b;

  return ((r << 16) + (g << 8) + b).toString(16).padStart(6, "0");
}
