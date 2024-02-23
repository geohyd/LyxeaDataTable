export type CustomElementArgs = {
  classList?: Array<string>;
  attributes?: Record<string, string | boolean>;
  content?: string;
  children?: Array<HTMLElement>;
  html?: string;
  style?: Record<string, Partial<CSSStyleDeclaration>>;
  onClick?: Array<(e?: MouseEvent) => void>;
  onChange?: Array<(e?: Event) => void>;
};

class AbstractLxDom {
  $element<G extends HTMLElement>(
    indentifier: keyof HTMLElementTagNameMap,
    {
      classList,
      attributes,
      content,
      children,
      html,
      style,
      onClick,
      onChange,
    }: CustomElementArgs
  ) {
    const el = document.createElement(indentifier);

    if (classList) classList.forEach((c) => el.classList.add(c));
    if (content) el.textContent = content;
    if (children) el.append(...children);
    if (html) el.innerHTML = html;
    if (style) {
      for (const [key, value] of Object.entries(style)) {
        el.style[key as any] = String(value);
      }
    }
    if (attributes) {
      Object.entries(attributes).forEach(([key, value]) => {
        if (typeof value === 'boolean') {
          el.toggleAttribute(key, value);
        } else {
          el.setAttribute(key, value);
        }
      });
    }

    /** set events */
    if (onClick) onClick.forEach((event) => event);
    if (onChange) onChange.forEach((event) => event);

    return el as G;
  }
}

export default AbstractLxDom;
