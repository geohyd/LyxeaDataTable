import { LyxeaDataTableConfigObject } from "../types/types";
import { ILyxeaDatatable } from "../types/LxDt_interface";
import AbstractLyxeaDatatable from "./AbstractLyxeaDatatable";
declare class LyxeaDatatable
  extends AbstractLyxeaDatatable
  implements ILyxeaDatatable
{
  datatable: import("datatables.net").Api<any>;
  constructor(config: LyxeaDataTableConfigObject);
}
export default LyxeaDatatable;
