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
declare class AbstractLxDom {
    $element<G extends HTMLElement>(indentifier: keyof HTMLElementTagNameMap, { classList, attributes, content, children, html, style, onClick, onChange, }: CustomElementArgs): G;
}
export default AbstractLxDom;
