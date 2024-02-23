import { ConfigColumns } from 'datatables.net-dt';
import {
  CustomConfigColumns,
  LxConfigObject,
  LxHeaderDef,
  LxHeadersConfig,
} from './LyxeaDatatable';

export enum HeaderGroup {
  NONE = 'NONE',
}

class DtHeaders {
  private config?: LxConfigObject;
  private headersGroup: Array<string>;
  private cols: Array<CustomConfigColumns>;

  constructor(config?: LxConfigObject) {
    this.config = config;
    this.headersGroup = [];
    this.cols = [];
  }

  setColsDef(config: LxConfigObject) {
    this.config = config;

    return this;
  }

  generate(): DtHeaders {
    if (!this.config || !this.config?.headers) return this;

    this.headersGroup = this.generateHeadersGroup(this.config.headers);

    return this;
  }

  generateHeadersGroup(headers: LxHeadersConfig): Array<string> {
    const headerGroups = new Set<string>();
    headers.map((header) => {
      if (header.headerGroup) headerGroups.add(header.headerGroup);
      header.columns.forEach((col) => this.cols.push(col));
    });

    return Array.from(headerGroups);
  }

  groupByHeadersGroup = (
    headers: Array<LxHeaderDef>
  ): Record<string, Array<CustomConfigColumns>> => {
    const group: Record<string, Array<CustomConfigColumns>> = {};

    for (let i = 0; i < headers.length; i++) {
      const col = headers[i];
      const headerGroup = col.headerGroup ?? `${HeaderGroup.NONE}_${i}`;
      group[headerGroup] = col.columns;
    }

    return group;
  };

  getColumns = (): Array<ConfigColumns> => this.cols;

  getGroupHeaders = (): Array<string> => this.headersGroup;

  getConfig = (): LxConfigObject | undefined => this.config;
}

export default DtHeaders;
