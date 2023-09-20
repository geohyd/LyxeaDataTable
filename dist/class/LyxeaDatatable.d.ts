import { LyxeaDataTableConfigObject } from "../types/types";
import { ILyxeaDatatable } from "../types/lx_interface";
declare class LyxeaDatatable implements ILyxeaDatatable {
  datatable: import("datatables.net").Api<any>;
  constructor(HTMLDivId: string);
  initCustomTable(config: LyxeaDataTableConfigObject): this;
}
export default LyxeaDatatable;
