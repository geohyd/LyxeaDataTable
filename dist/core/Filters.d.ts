import { CustomDatatableConfig } from './LyxeaDatatable';
import DataTable from 'datatables.net-dt';
declare class Filters<T> {
    #private;
    constructor(config: CustomDatatableConfig<T>, instance?: DataTable<T>);
    init(headerEl?: HTMLElement): HTMLElement | undefined;
    _filterEvent(e: Event): void;
}
export default Filters;
