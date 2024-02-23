import { CustomDatatableConfig, ParsedConfig } from './LyxeaDatatable';
declare class AbstractLyxeaDatatable {
    instance: any | null;
    constructor();
    initEvent: (data: any) => CustomEvent<any>;
    validateConfig<T>(dtConfig: CustomDatatableConfig<T> | undefined): CustomDatatableConfig<T> | never;
    _splitConfig<T>(config: CustomDatatableConfig<T>): ParsedConfig;
}
export default AbstractLyxeaDatatable;
