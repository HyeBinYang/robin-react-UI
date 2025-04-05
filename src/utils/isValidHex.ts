export default function isValidHex(str: string) {
  if (str.length !== 2) return false;

  return /^[0-9a-fA-F]{2}$/.test(str);
}
