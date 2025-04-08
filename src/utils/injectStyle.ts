export default function injectStyle(className: string, cssRules: string) {
  const style = document.createElement("style");
  style.innerHTML = `.${className} { ${cssRules} }`;
  document.head.appendChild(style);
}
