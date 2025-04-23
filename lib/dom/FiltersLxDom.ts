import AbstractLxDom from './AbstractLxDom';
import DataTable from 'datatables.net';

/**
 * Deprecated
 */
class FiltersLxDom extends AbstractLxDom {
  #headerElement: Node;
  constructor(header: Node) {
    super();

    this.#headerElement = header;
  }

  generate<T>(
    columnsLength: number,
    instance: DataTable<T>,
    callBack: (e: Event) => void
  ): Node {
    const filtersHeaderGroup = this.$headerGroup();
    for (let i = 0; i < columnsLength; i++) {
      const filterInput = this.$filterInputs();
      const filterIcon = this.$filterIcon();

      const container = this.$element('div', {
        style: {
          position: 'relative',
          width: '100%',
        },
        children: [filterInput, filterIcon],
      });
      filterInput.dataset.index = String(i);
      filterInput.addEventListener('keyup', callBack.bind(instance));

      const th = this.$element('th', {
        children: [container],
      });
      filtersHeaderGroup.appendChild(th);
    }
    this.#headerElement.appendChild(filtersHeaderGroup);

    return this.#headerElement;
  }

  private $headerGroup(): HTMLElement {
    return this.$element('tr', {
      classList: ['header_search'],
    });
  }

  private $filterInputs(): HTMLInputElement {
    return this.$element('input', {
      classList: ['colum_search'],
      style: {
        height: '22px',
        padding: '0 8px',
        lineHeight: ' 20px',
        fontStyle: 'italic',
        textAlign: 'left',
        fontWeight: ' normal',
        color: ' #999',
        width: '100%',
        position: 'relative',
        borderRadius: '3px',
        paddingRight: '18px',
      },
    });
  }

  private $filterIcon(): HTMLElement {
    return this.$element('i', {
      classList: ['fa', 'fa-search'],
      style: {
        position: 'absolute',
        top: '6px',
        right: '5px',
      },
    });
  }
}

export default FiltersLxDom;
