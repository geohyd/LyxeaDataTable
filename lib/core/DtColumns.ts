import { ConfigColumns } from 'datatables.net-dt';
import { LxDefaultKeyDef } from './LyxeaDatatable';

class DtColumns {
  #colsDef?: Array<ConfigColumns>;

  constructor(colsDef?: Array<ConfigColumns>) {
    this.#colsDef = colsDef;
  }

  get colsDef(): ConfigColumns[] | undefined {
    return this.#colsDef;
  }

  setColsDef(colsDef?: Array<ConfigColumns>): DtColumns {
    this.#colsDef = colsDef;

    return this;
  }

  /**
   * @description set default value from columnsDefaultKey config key
   */
  static setDefaultKeyValue(
    defaultKeyConfig: LxDefaultKeyDef | null = null,
    colmunsConfig: Array<ConfigColumns>
  ) {
    if (!defaultKeyConfig) return colmunsConfig;
    colmunsConfig.forEach((column) => {
      Object.entries(defaultKeyConfig).map(([key, value]) => {
        if (!(key in column)) {
          (column as any)[key] = value;
        }
      });
    });
    return colmunsConfig;
  }

  public static mergeColumns(
    baseColumns: Array<ConfigColumns>,
    customColumns: Array<ConfigColumns>
  ): Array<ConfigColumns> {
    const mergedColumnsMap: Record<string, ConfigColumns> = {};

    for (let i = 0; i < baseColumns.length; i++) {
      const col = baseColumns[i];
      mergedColumnsMap[col.name as string] = col;
    }

    for (let i = 0; i < customColumns.length; i++) {
      const col = customColumns[i];
      if (mergedColumnsMap[col.name as string]) {
        mergedColumnsMap[col.name as string] = {
          ...mergedColumnsMap[col.name as string],
          ...col,
        };
      } else {
        mergedColumnsMap[col.name as string] = col;
      }
    }

    return Object.values(mergedColumnsMap);
  }
}

export default DtColumns;
