import { default as AbstractLxDom } from './AbstractLxDom';
import { LxConfigObject } from '../core/LyxeaDatatable';

declare class FooterLxDom extends AbstractLxDom {
    tableRef: HTMLElement | null;
    footerRef: HTMLElement | null;
    config: LxConfigObject;
    constructor(ref: HTMLElement, config: LxConfigObject);
    appendTableFooter: () => void;
    getFooterElement: () => HTMLElement | null;
    build(id?: string, className?: string): Promise<HTMLElement>;
}
export default FooterLxDom;
