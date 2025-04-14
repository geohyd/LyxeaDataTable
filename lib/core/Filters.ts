import { LxConfigObject } from './LyxeaDatatable';
import DataTable from 'datatables.net-dt';
import FooterLxDom from '@dom/FootersLxDom';

class Filters<T> {
  tableRef: HTMLElement | null;
  config: LxConfigObject;
  footerUiBuilder: FooterLxDom;

  constructor(ref: HTMLElement, config: LxConfigObject) {
    this.tableRef = ref;
    this.config = config;
    this.footerUiBuilder = new FooterLxDom(this.tableRef, config);
  }

  async build(id = 'main_filter', className = 'main_filter'): Promise<HTMLElement> {
    return this.footerUiBuilder.build(id, className);
  }

  init(dtInstance: DataTable<T>, type: String) {
    // @ts-ignore
    dtInstance.columns()
    .every(function () {
        // @ts-ignore
        let title = this.footer().textContent;

        // Create input element
        if(type == 'input'){
          let input = document.createElement('input');
          input.placeholder = title;
          // @ts-ignore
          this.footer().replaceChildren(input);

          // Event listener for user input
          input.addEventListener('keyup', () => {
              // @ts-ignore
              if (this.search() !== this.value) {
                // @ts-ignore
                this.search(input.value).draw();
              }
          });
        }
    });
  }
}

export default Filters;
