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

  async build(
    id = 'main_filter',
    className = 'main_filter'
  ): Promise<HTMLElement> {
    return this.footerUiBuilder.build(id, className);
  }

  init(dtInstance: DataTable<T>, type: String) {
    // @ts-ignore
    dtInstance.columns().every(function () {
      // @ts-ignore
      let title = this.footer().textContent;

      // Create input element
      if (type == 'input') {
        // Create a container div for the input and icon
        let container = document.createElement('div');
        container.classList.add('column_search_container');
        // Create the input element
        let input = document.createElement('input');
        input.setAttribute('type', 'text');
        input.classList.add('column_search');
        input.placeholder = title;
        // Create the icon element
        let icon = document.createElement('i');
        icon.classList.add('fa', 'fa-search');
        // Append the input and icon to the container
        container.appendChild(input);
        container.appendChild(icon);
        // Replace the footer content with the container
        // @ts-ignore
        this.footer().replaceChildren(container);
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
