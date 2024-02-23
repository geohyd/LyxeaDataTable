import 'datatables.net-fixedheader';
import jszip from 'jszip';
import 'pdfmake';
import 'datatables.net-buttons-dt';
import 'datatables.net-buttons/js/buttons.colVis.mjs';
import 'datatables.net-buttons/js/buttons.html5.mjs';
import 'datatables.net-buttons/js/buttons.print.mjs';

import DataTable, { Config, ConfigColumns } from 'datatables.net-dt';
import AbstractLyxeaDatatable from './AbstractLyxeaDatatable';
import DtHeaders from './DtHeaders';
import Dao from '@dao/Dao';
import Dto from '@dto/Dto';
import { ILyxeaDatatable } from 'lib/types/LxDt_interface';
import DtColumns from './DtColumns';
import HeaderLxDom from '@dom/HeadersLxDom';
import DaoError from '@dao/DaoError';
import Transformers from '@dto/Transformers';
import Action, { ActionArgs } from '@plugins/action/Action';
import DtButtons from './DtButtons';
import Filters from './Filters';

//@ts-ignore
window.JSZip = jszip;

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
class LyxeaDatatable<T>
  extends AbstractLyxeaDatatable
  implements ILyxeaDatatable<T>
{
  config?: CustomDatatableConfig<T>;
  _ref: string;
  refElement: HTMLDivElement | null;
  dao: Dao<T>;
  dto: Dto<T>;
  tranformer: Transformers<T>;

  #standardColumnBuilder?: DtColumns;
  #customColumnBuilder?: DtHeaders;
  #dtButtons?: DtButtons;
  #headerElement?: HTMLElement;

  constructor(ref: string, config?: CustomDatatableConfig<T>) {
    super();

    this._ref = ref;
    this.refElement = <HTMLDivElement>document.querySelector(ref);
    this.config = config;

    this.dao = new Dao<T>();
    this.dto = new Dto<T>();
    this.tranformer = new Transformers<T>();
  }

  /**
   * Get the default datatable config if not set
   */
  public setDefaults<T>(
    config: CustomDatatableConfig<T>
  ): CustomDatatableConfig<T> {
    if (!config.dom && !config.layout)
      config.dom = '<"top"Bf>rt<"bottom"lip><"clear">';
    if (!config.scrollX) config.scrollX = config.scrollX ?? true;
    if (!config.fixedHeader) config.fixedHeader = config.fixedHeader ?? true;
    if (!config.paging) config.paging = config.paging ?? true;
    if (config.lxConfig) {
      config.lxConfig.filters = config.lxConfig.filters ?? true;
      config.lxConfig.handleBootrapTabChange =
        config.lxConfig.handleBootrapTabChange ?? true;
    }

    return config;
  }

  /**
   * Main function of datatable
   *
   * Instantiating the lx datatable
   * Generate cols, create dom content etc...
   */
  public async init(): Promise<LyxeaDatatable<T>> {
    /**
     * Validate configuration object
     */
    try {
      this.config = this.validateConfig(this.config);
    } catch (err: any) {
      console.error(err.message);
      return this;
    }

    /**
     * set defaults config
     */
    this.setDefaults(this.config);

    let standardColumns: Array<ConfigColumns> = [];
    let customColumns: Array<ConfigColumns> = [];

    if (!this.refElement)
      throw new DOMException("Error: element selected doesn't exist");

    /**
     * Extract standard config & lxConfig
     */
    const { standardConfig, lxConfig } = this._splitConfig<T>(this.config!);

    this.#standardColumnBuilder = new DtColumns();
    this.#customColumnBuilder = new DtHeaders();
    this.#dtButtons = new DtButtons();

    if (standardConfig) {
      standardColumns =
        this.#standardColumnBuilder.setColsDef(standardConfig.columns)
          .colsDef ?? []; // to improve
    }

    if (lxConfig) {
      const headersBuilder = this.#customColumnBuilder
        .setColsDef(lxConfig)
        .generate();
      customColumns = headersBuilder.getColumns();

      const headerUiBuilder = new HeaderLxDom(this.refElement, {
        headers: headersBuilder,
        config: lxConfig,
      });
      this.#headerElement = await headerUiBuilder.build();

      /**
       * Get the data if not set
       */
      if (!this.config.data) {
        try {
          const { data, error } = await this.dao.fetchData(lxConfig.url);
          if (error) throw new DaoError(error.message);

          this.config.data = data ?? [];
        } catch (err: any) {
          console.error(err.message);
          return this;
        }
      }
    }

    /**
     * Overide colmuns definition
     */
    this.config.columns = DtColumns.setDefaultKeyValue(
      this.#customColumnBuilder.getConfig()?.columnsDefaultKey,
      customColumns
    );

    this.config.columns = DtColumns.mergeColumns(
      standardColumns,
      customColumns
    );

    /**
     * Execute each tranformers
     */
    if (!this.config.data) throw new Error('Error : no data provided');
    this.config.data = this.tranformer.exec(this.config.data);

    /**
     * Actions
     */
    if (lxConfig?.row_action && lxConfig.row_action.actions.length) {
      const actionBuilder = new Action(lxConfig.row_action);
      try {
        const actionColDef = await actionBuilder
          .validateConfig()
          .generateColDefConfig();

        if (this.config.columnDefs)
          this.config.columnDefs = [...this.config.columnDefs, actionColDef];
        else this.config.columnDefs = Array(actionColDef);
      } catch (err: any) {
        console.error(err.message);
      }
    }

    /**
     * Adding buttons
     */
    if (!this.config.buttons)
      this.config.buttons = this.#dtButtons.getDefaults();

    this.#dtButtons.parse(this.config.buttons);

    //@ts-ignore
    window.lxConfig = this.config;
    /**
     * Initializing datatable
     * Init event, get the datable instance on event.detail
     */
    this.instance = new DataTable(`${this._ref}`, this.config);
    this.refElement.dispatchEvent(this.initEvent(this.instance));

    /**
     * Handle issue with bootstrap tab nav
     */
    if (lxConfig && lxConfig.handleBootrapTabChange)
      this.handleBootrapTabChange(this.instance);

    /**
     * Adding filter inputs
     */
    if (lxConfig && lxConfig.filters) {
      this.#headerElement = new Filters(this.config, this.instance).init(
        this.#headerElement
      );
    }

    return this;
  }

  __filterDataWithKey() {}

  handleBootrapTabChange<T>(instance: DataTable<T>) {
    document.querySelectorAll('button[data-bs-toggle="tab"]').forEach((el) => {
      el.addEventListener('shown.bs.tab', () => {
        // @ts-ignore
        instance.draw();
      });
    });
  }
}

export default LyxeaDatatable;
