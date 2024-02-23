import DataTable, { Config, ConfigColumns } from 'datatables.net-dt';
import AbstractLyxeaDatatable from './AbstractLyxeaDatatable';
import Dao from '../dao/Dao';
import Dto from '../dto/Dto';
import { ILyxeaDatatable } from 'lib/types/LxDt_interface';
import Transformers from '../dto/Transformers';
import { ActionArgs } from '../plugins/action/Action';
/**
 * @types
 */
export interface CustomConfigColumns extends ConfigColumns {
    style?: Record<string, Partial<CSSStyleDeclaration>>;
}
export interface CustomDatatableConfig<T> extends Config {
    lxConfig?: LxConfigObject;
    data?: Array<T>;
}
export type LxConfigObject = {
    url?: string;
    headers?: LxHeadersConfig;
    filters?: boolean;
    handleBootrapTabChange?: boolean;
    row_action?: {
        width: string;
        className?: string;
        actions: Array<ActionArgs>;
    };
    columnsDefaultKey?: LxDefaultKeyDef;
};
export type LxHeadersConfig = Array<LxHeaderDef>;
export type LxHeaderDef = {
    headerGroup?: string;
    columns: Array<CustomConfigColumns>;
};
export type ParsedConfig = {
    standardConfig: Config | null | undefined;
    lxConfig: LxConfigObject | null | undefined;
};
export type LxDefaultKeyDef = Record<string, string | number | boolean>;
/**
 * @class LyxeaDatatable
 *
 * @description Main class resprenting the LYXEA encapsulation of lyxea datatable
 *
 * {T} - generic represent the data structure of the data exposed by the api used
 *
 * You can specifie it when you instanciate the dt with new LyxeaDatatable<MyDataStructure>(...config) to get the correct auto completion.
 */
declare class LyxeaDatatable<T> extends AbstractLyxeaDatatable implements ILyxeaDatatable<T> {
    #private;
    config?: CustomDatatableConfig<T>;
    _ref: string;
    refElement: HTMLDivElement | null;
    dao: Dao<T>;
    dto: Dto<T>;
    tranformer: Transformers<T>;
    constructor(ref: string, config?: CustomDatatableConfig<T>);
    /**
     * Get the default datatable config if not set
     */
    setDefaults<T>(config: CustomDatatableConfig<T>): CustomDatatableConfig<T>;
    /**
     * Main function of datatable
     *
     * Instantiating the lx datatable
     * Generate cols, create dom content etc...
     */
    init(): Promise<LyxeaDatatable<T>>;
    __filterDataWithKey(): void;
    handleBootrapTabChange<T>(instance: DataTable<T>): void;
}
export default LyxeaDatatable;
