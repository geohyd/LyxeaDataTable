import { LyxeaDataTableConfigObject } from "../types/types";

class AbstractLyxeaDatatable {
  config: LyxeaDataTableConfigObject | null;

  constructor() {
    this.config = null;
  }

  validateConfiguration(configuration: LyxeaDataTableConfigObject) {
    if (!configuration.dataSource) {
      throw new Error("Error: you must provide a dataSource");
    }
    return this;
  }
}

export default AbstractLyxeaDatatable;
