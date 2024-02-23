import { ConfigColumns } from 'datatables.net-dt';
import { LxDefaultKeyDef } from './LyxeaDatatable';
declare class DtColumns {
  #private;
  constructor(colsDef?: Array<ConfigColumns>);
  get colsDef(): ConfigColumns[] | undefined;
  setColsDef(colsDef?: Array<ConfigColumns>): DtColumns;
  /**
   * @description set default value from columnsDefaultKey config key
   */
  static setDefaultKeyValue(
    defaultKeyConfig: LxDefaultKeyDef | null | undefined,
    colmunsConfig: Array<ConfigColumns>
  ): ConfigColumns[];
  static mergeColumns(
    baseColumns: Array<ConfigColumns>,
    customColumns: Array<ConfigColumns>
  ): Array<ConfigColumns>;
}
export default DtColumns;
