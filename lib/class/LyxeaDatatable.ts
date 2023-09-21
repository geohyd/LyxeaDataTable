import DataTable from "datatables.net";
import { LyxeaDataTableConfigObject } from "../types/types";
import { ILyxeaDatatable } from "../types/LxDt_interface";
import AbstractLyxeaDatatable from "./AbstractLyxeaDatatable";

class LyxeaDatatable extends AbstractLyxeaDatatable implements ILyxeaDatatable {
  datatable;
  constructor(config: LyxeaDataTableConfigObject) {
    super();
    this.validateConfiguration(config);
    this.config = config;
    this.datatable = new DataTable(`${this.config.HTMLDivId}`);
  }
}

export default LyxeaDatatable;
