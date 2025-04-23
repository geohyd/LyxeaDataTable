import { ConfigColumns } from 'datatables.net-dt';
import { CustomConfigColumns, LxConfigObject, LxHeaderDef, LxHeadersConfig } from './LyxeaDatatable';

export declare enum HeaderGroup {
    NONE = "NONE"
}
declare class DtHeaders {
    private config?;
    private headersGroup;
    private cols;
    constructor(config?: LxConfigObject);
    setColsDef(config: LxConfigObject): this;
    generate(): DtHeaders;
    generateHeadersGroup(headers: LxHeadersConfig): Array<string>;
    groupByHeadersGroup: (headers: Array<LxHeaderDef>) => Record<string, Array<CustomConfigColumns>>;
    getColumns: () => Array<ConfigColumns>;
    getGroupHeaders: () => Array<string>;
    getConfig: () => LxConfigObject | undefined;
}
export default DtHeaders;
