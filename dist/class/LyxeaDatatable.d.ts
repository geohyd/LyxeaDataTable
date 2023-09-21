import { LyxeaDataTableConfigObject } from "../types/types";
import { ILyxeaDatatable } from "../types/LxDt_interface";
declare class LyxeaDatatable implements ILyxeaDatatable {
  datatable: import("datatables.net").Api<any>;
  config: LyxeaDataTableConfigObject;
  constructor(config: LyxeaDataTableConfigObject);
}
export default LyxeaDatatable;
