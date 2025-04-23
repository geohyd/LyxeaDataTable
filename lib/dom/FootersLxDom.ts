import AbstractLxDom from './AbstractLxDom';
import { LxConfigObject } from '@core/LyxeaDatatable';
import DomError from './DomError';

class FooterLxDom extends AbstractLxDom {
  tableRef: HTMLElement | null;
  footerRef: HTMLElement | null = null;
  config: LxConfigObject;

  constructor(ref: HTMLElement, config: LxConfigObject) {
    super();
    this.tableRef = ref;
    this.config = config;

    this.appendTableFooter();
    this.getFooterElement();
  }

  appendTableFooter = () => {
    if (!this.tableRef?.querySelector('tfoot'))
      this.tableRef?.append(this.$element('tfoot', {}));
  };

  getFooterElement = (): HTMLElement | null => {
    this.footerRef = this.tableRef?.querySelector('tfoot') ?? null;
    return this.footerRef;
  };

  async build(
    id = 'main_footer',
    className = 'main_footer'
  ): Promise<HTMLElement> {
    if (!this.footerRef) throw new DomError('Cannot select the dom footer ref');
    if (!this.config.headers?.length) return this.footerRef;

    const groupFooterCells: Array<HTMLElement> = [];
    this.config.headers?.forEach((header) => {
      header.columns?.forEach((column) => {
        groupFooterCells.push(
          this.$element('th', {
            classList: ['colspan-border'],
            attributes: {
              rowspan: '1',
              colspan: '1',
            },
            //content: column.title,
            style: column.style,
          })
        );
      });
    });
    const groupFooterWrapper = this.$element('tr', {
      attributes: { class: className, id: id },
      children: groupFooterCells,
    });
    this.footerRef?.append(groupFooterWrapper);

    return this.footerRef;
  }
}

export default FooterLxDom;
