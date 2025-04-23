import { default as DataTable, Config, ConfigColumns } from 'datatables.net-dt';
import { default as AbstractLyxeaDatatable } from './AbstractLyxeaDatatable';
import { default as Dao } from '../dao/Dao';
import { default as Dto } from '../dto/Dto';
import { ILyxeaDatatable } from 'lib/types/LxDt_interface';
import { default as Transformers } from '../dto/Transformers';
import { ActionArgs } from '../plugins/action/Action';
import { default as Filters } from './Filters';

/**
 * @types
 */
export interface CustomConfigColumns extends ConfigColumns {
    renderer?: CustomRenderer;
    style?: Record<string, Partial<CSSStyleDeclaration>>;
}
export type CustomRenderer = string | Function | Array<string> | Array<Function> | Array<string | Function>;
export type ScrollYFitToScreen = {
    addStaticMargin?: number;
};
export interface CustomDatatableConfig<T> extends Config {
    lxConfig?: LxConfigObject;
    data?: Array<T>;
}
export type LxConfigObject = {
    keepFixedHeaderInDT?: boolean;
    url?: string;
    headers?: LxHeadersConfig;
    filters?: boolean;
    handleBootrapTabChange?: boolean;
    scrollYFitToScreen?: boolean | ScrollYFitToScreen;
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
    filterColumn?: Filters<T>;
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
    __keepFixedHeaderInDT(): void;
    _scrollYFitToScreen(config: ScrollYFitToScreen): void;
    handleBootrapTabChange<T>(instance: DataTable<T>): void;
    _convertToScrollYFitToScreenConfig(config: boolean | ScrollYFitToScreen): ScrollYFitToScreen;
}
export default LyxeaDatatable;
