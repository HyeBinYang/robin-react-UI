import isValidHex from "./isValidHex";

export default function hexToRgb(hex: string, alpha?: number): string | null {
  const cleaned = hex.replace("#", "");

  if (cleaned.length !== 6 || cleaned.includes("#")) return null;

  const r = cleaned.slice(0, 2);
  const g = cleaned.slice(2, 4);
  const b = cleaned.slice(4, 6);

  if (!isValidHex(r) || !isValidHex(g) || !isValidHex(b)) return null;

  return alpha
    ? `rgba(${parseInt(r, 16)}, ${parseInt(g, 16)}, ${parseInt(b, 16)}, ${alpha})`
    : `rgb(${parseInt(r, 16)}, ${parseInt(g, 16)}, ${parseInt(b, 16)})`;
}
