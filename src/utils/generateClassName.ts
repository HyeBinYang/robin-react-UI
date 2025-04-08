export default function generateClassName(prefix = "robin") {
  return `${prefix}-${Math.random().toString(36).substr(2, 6)}`;
}
