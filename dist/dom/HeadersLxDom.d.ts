import DtHeaders from '../core/DtHeaders';
import AbstractLxDom from './AbstractLxDom';
import { LxConfigObject } from '../core/LyxeaDatatable';
export type HeaderLxDomArgs = {
    headers: DtHeaders;
    config: LxConfigObject;
};
declare class HeaderLxDom extends AbstractLxDom {
    tableRef: HTMLElement | null;
    headerRef: HTMLElement | null;
    config: LxConfigObject;
    headers: DtHeaders;
    readonly MAIN_HEADER_ID = "main_header";
    readonly GROUP_HEADER_ID = "group_header";
    constructor(ref: HTMLElement, { headers, config }: HeaderLxDomArgs);
    appendTableHeader: () => void | undefined;
    getHeaderElement: () => HTMLElement | null;
    $headerWrapper: (id: string, className: string, children: Array<HTMLElement>) => HTMLElement;
    build(): Promise<HTMLElement>;
    /**
     * Build main headers columns
     */
    private $mainHeader;
    private $mainRowHeader;
    /**
     * Build Group headers
     */
    private $groupHeaders;
}
export default HeaderLxDom;
