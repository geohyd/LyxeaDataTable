import { LyxeaDataTableConfigObject } from "../types/types";
declare class AbstractLyxeaDatatable {
  config: LyxeaDataTableConfigObject | null;
  constructor();
  validateConfiguration(configuration: LyxeaDataTableConfigObject): this;
}
export default AbstractLyxeaDatatable;
