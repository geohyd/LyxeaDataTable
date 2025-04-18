import 'datatables.net-fixedheader';
import jszip from 'jszip';
import 'pdfmake';
import 'datatables.net-buttons-dt';
import 'datatables.net-buttons/js/buttons.colVis.mjs';
import 'datatables.net-buttons/js/buttons.html5.mjs';
import 'datatables.net-buttons/js/buttons.print.mjs';

import DataTable, { Config, ConfigColumns, ConfigButtons, ButtonConfig } from 'datatables.net-dt';
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
import LxRenderer from '@dto/Renderer';
import { default as jquery } from 'jquery';

//@ts-ignore
window.JSZip = jszip;

/**
 * @types
 */
export interface CustomConfigColumns extends ConfigColumns {
  renderer?: CustomRenderer;
  style?: Record<string, Partial<CSSStyleDeclaration>>;
}

export type CustomRenderer =
  | string
  | Function
  | Array<string>
  | Array<Function>
  | Array<string | Function>;

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
  // @ts-ignore
  #headerElement?: HTMLElement;
  filterColumn?: Filters<T>;

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
      config.lxConfig.scrollYFitToScreen =
        config.lxConfig.scrollYFitToScreen ?? false;
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
      /*
        If columns in the standard object and in lxconfig, header generation is only based on lxconfig.
        This allows you to generate the header with all the columns (and not just the columns defined in lxconfig).
      */
      if (standardColumns?.length) {
        lxConfig.headers = lxConfig.headers ? 
          [{ columns: [...standardColumns] }, ...lxConfig.headers] : 
          [{ columns: [...standardColumns] }];
      }
      new LxRenderer(lxConfig);
      const headersBuilder = this.#customColumnBuilder
        .setColsDef(lxConfig)
        .generate();
      customColumns = headersBuilder.getColumns();

      const headerUiBuilder = new HeaderLxDom(this.refElement, {
        headers: headersBuilder,
        config: lxConfig,
      });
      this.#headerElement = await headerUiBuilder.build();

      if (lxConfig && lxConfig.filters) {
        this.filterColumn = new Filters(this.refElement, lxConfig);
        await this.filterColumn.build();
      }

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

    this.#dtButtons.parse(this.config.buttons as true | ConfigButtons | (string | ButtonConfig)[]);

    jquery(`${this._ref}`).on('init.dt', (e, settings) => {
      if (e.namespace !== 'dt') {
        return;
      }
      const dtInstance = settings.oInstance.api();
      /**
       * Adding filter inputs
       */
      if (lxConfig && lxConfig.filters) {
        this.filterColumn?.init(dtInstance, 'input');
        if(this.config?.scrollX){
          jquery(`${this._ref}_wrapper .dt-scroll-foot tfoot tr th`).removeAttr('data-dt-column');
          var footer = jquery(`${this._ref}_wrapper .dt-scroll-foot tfoot tr`);
          jquery(`${this._ref}_wrapper .dt-scroll-head thead`).append(footer);
        } else {
          jquery(`${this._ref} tfoot tr th`).removeAttr('data-dt-column');
          var footer = jquery(`${this._ref} tfoot tr`);
          jquery(`${this._ref} thead`).append(footer);
        }
      }

      /**
       * Fit scrollY to screen
       */
      if (lxConfig?.scrollYFitToScreen) {
          const scrollYConfig = this._convertToScrollYFitToScreenConfig(lxConfig.scrollYFitToScreen);
          this._scrollYFitToScreen(scrollYConfig);
          // Force redraw (FitToScreen has an effect on the draw event)
          dtInstance.draw();
      }
    });
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

    if (lxConfig?.keepFixedHeaderInDT && this._ref && this.instance?.fixedHeader && this.instance?.fixedHeader.enabled()) {
      this.__keepFixedHeaderInDT();
    }
    return this;
  }

  __filterDataWithKey() {}

  
  __keepFixedHeaderInDT() {
    const onScroll = () => {
      // Vérifie si FixedHeader est actif (présence de .dtfh-floatingparent)
      // Et on le déplace en haut du tableau
      
      // Récupère l’élément DOM du tableau
      const table = document.querySelector(this._ref);
      if (!table) return;

      const refClean = this._ref.startsWith('#') || this._ref.startsWith('.') 
      ? this._ref.slice(1) 
      : this._ref;
      const expectedAriaDescribedBy = `${refClean}_info`;
      // Cherche tous les floating headers possibles
      const floatingHeaders = document.querySelectorAll('.dtfh-floatingparent');
      // On cherche celui qui correspond à notre datatable
      const floatingHeader = Array.from(floatingHeaders).find(header => {
        const innerTable = header.querySelector('table');
        return innerTable?.getAttribute('aria-describedby') === expectedAriaDescribedBy;
      });
      // Vérifie que le header n’est pas déjà dans le tableau
      if (floatingHeader && !table.contains(floatingHeader)) {
        // Insère le header tout en haut de la table
        table.insertBefore(floatingHeader, table.firstChild);
      }
      // Supprimer l’event listener si on ne veut le faire qu’une fois :
      // window.removeEventListener('scroll', onScroll);
    };
  
    // Ajoute l'écouteur
    window.addEventListener('scroll', onScroll);
  }
  _scrollYFitToScreen(config: ScrollYFitToScreen) {
    const self = this;
    const staticMargin = config && config.addStaticMargin ? config.addStaticMargin : 0;
    jquery(`${this._ref}`).on('draw.dt', (e, _) => {
      if (e.namespace !== 'dt') {
        return;
      }
      const tabPosition = document.querySelector(
        `${self._ref}_wrapper`
      ) as HTMLElement;
      if (tabPosition) {
        const tabTop = tabPosition.getBoundingClientRect().top;
        const dtScrollHeadHeight = (
          (document.querySelector(
            `${self._ref}_wrapper .dt-scroll-head`
          ) as HTMLElement) || { offsetHeight: 0 }
        ).offsetHeight;
        const dtTop = (
          (document.querySelector(
            `${self._ref}_wrapper .top`
          ) as HTMLElement) || { offsetHeight: 0 }
        ).offsetHeight;
        const dtBottom = (
          (document.querySelector(
            `${self._ref}_wrapper .bottom`
          ) as HTMLElement) || { offsetHeight: 0 }
        ).offsetHeight;
        const dtScrollFootHeight = (
          (document.querySelector(
            `${self._ref}_wrapper .dt-scroll-foot`
          ) as HTMLElement) || { offsetHeight: 0 }
        ).offsetHeight;
        const dtLayoutRows = document.querySelectorAll(
          `${self._ref}_wrapper .dt-layout-row:not(.dt-layout-table)`
        );
        const dtLayoutRowsHeight = Array.from(dtLayoutRows).reduce(
          (acc, node) => acc + (node as HTMLElement).offsetHeight,
          0
        );
        console.log("dtLayoutRowsHeight", dtLayoutRowsHeight);
        const myHeight =
          window.innerHeight - // La taille de la fenêtre complete
          tabTop - // L'ordonnée du haut du tableau
          dtTop - // La taille du top (lorsqu'on utilise `dom`)
          dtBottom - // La taille du bottom (lorsqu'on utilise `dom`)
          dtScrollHeadHeight - // La taille du header (lorsqu'on utilise `layout`)
          dtScrollFootHeight - // La taille du footer (lorsqu'on utilise `layout`)
          dtLayoutRowsHeight - // La taille de toutes les rows (lorsqu'on utilise `layout`)
          staticMargin; // valeur statique pour assurer une marge
        const dtScrollBody = document.querySelector(
          `${self._ref}_wrapper .dt-scroll-body`
        ) as HTMLElement;
        if (tabTop + tabPosition.offsetHeight > window.innerHeight) {
          dtScrollBody.style.minHeight = myHeight + 'px';
          dtScrollBody.style.height = myHeight + 'px';
        }
      }
    });
  }

  handleBootrapTabChange<T>(instance: DataTable<T>) {
    // For JQUERY user
    if (typeof $ == 'function') {
      $('a[data-toggle="tab"]').on('shown.bs.tab', function () {
        // @ts-ignore
        instance.draw();
      });
    }
    document.querySelectorAll('button[data-bs-toggle="tab"]').forEach((el) => {
      el.addEventListener('shown.bs.tab', () => {
        // @ts-ignore
        instance.draw();
      });
    });
  }

  // Créer une fonction utilitaire pour convertir le paramètre
  _convertToScrollYFitToScreenConfig(config: boolean | ScrollYFitToScreen): ScrollYFitToScreen {
    if (typeof config === 'boolean' && config === true) {
        return {
            addStaticMargin: 0
        };
    }
    return config as ScrollYFitToScreen;
  }
}

export default LyxeaDatatable;
