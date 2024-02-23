import FiltersLxDom from '@dom/FiltersLxDom';
import { CustomDatatableConfig } from './LyxeaDatatable';
import DataTable from 'datatables.net-dt';

class Filters<T> {
  #domBuilder?: FiltersLxDom;
  #headerLength: number;
  #instance?: DataTable<T>;

  constructor(config: CustomDatatableConfig<T>, instance?: DataTable<T>) {
    this.#headerLength = this.#calculateHeaderLength(config);
    this.#instance = instance;
  }

  #calculateHeaderLength<T>(config: CustomDatatableConfig<T>): number {
    let sum = 0;
    if (config.columns) {
      sum += config.columns.length;
    }
    if (config.lxConfig && config.lxConfig.headers) {
      config.lxConfig.headers.forEach((header) => {
        sum += header.columns.length;
      });
    }

    return sum;
  }

  init(headerEl?: HTMLElement): HTMLElement | undefined {
    if (!headerEl) return;
    if (!this.#instance) throw new Error('Instance is not defined');

    this.#domBuilder = new FiltersLxDom(headerEl);
    return this.#domBuilder.generate(
      this.#headerLength,
      this.#instance,
      this._filterEvent
    ) as HTMLElement;
  }

  _filterEvent(e: Event) {
    const input = e.target as HTMLInputElement;
    // @ts-ignore
    this.column(input.dataset.index).search(input.value).draw();
  }
}

export default Filters;
