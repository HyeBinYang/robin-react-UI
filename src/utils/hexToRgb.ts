export default function hexToRgb(hex: string, alpha?: number): string | null {
  const cleaned = hex.replace("#", "");

  if (![3, 6].includes(cleaned.length)) return null;

  // #abc → #aabbcc로 확장
  const fullHex =
    cleaned.length === 3
      ? cleaned
          .split("")
          .map((c) => c + c)
          .join("")
      : cleaned;

  const r = parseInt(fullHex.slice(0, 2), 16);
  const g = parseInt(fullHex.slice(2, 4), 16);
  const b = parseInt(fullHex.slice(4, 6), 16);

  return alpha ? `rgba(${r}, ${g}, ${b}, ${alpha})` : `rgb(${r}, ${g}, ${b})`;
}
