import { LxConfigObject } from './LyxeaDatatable';
import DataTable from 'datatables.net-dt';
import FooterLxDom from '../dom/FootersLxDom';
declare class Filters<T> {
    tableRef: HTMLElement | null;
    config: LxConfigObject;
    footerUiBuilder: FooterLxDom;
    constructor(ref: HTMLElement, config: LxConfigObject);
    build(id?: string, className?: string): Promise<HTMLElement>;
    init(dtInstance: DataTable<T>, type: String): void;
}
export default Filters;
