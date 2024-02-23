import DtHeaders, { HeaderGroup } from '@core/DtHeaders';
import AbstractLxDom from './AbstractLxDom';
import { CustomConfigColumns, LxConfigObject } from '@core/LyxeaDatatable';
import DomError from './DomError';

export type HeaderLxDomArgs = {
  headers: DtHeaders;
  config: LxConfigObject;
};

class HeaderLxDom extends AbstractLxDom {
  tableRef: HTMLElement | null;
  headerRef: HTMLElement | null = null;
  config: LxConfigObject;

  headers;

  readonly MAIN_HEADER_ID = 'main_header';
  readonly GROUP_HEADER_ID = 'group_header';

  constructor(ref: HTMLElement, { headers, config }: HeaderLxDomArgs) {
    super();
    this.tableRef = ref;
    this.headers = headers;
    this.config = config;

    this.appendTableHeader();
    this.getHeaderElement();
  }

  appendTableHeader = () => this.tableRef?.append(this.$element('thead', {}));

  getHeaderElement = (): HTMLElement | null => {
    this.headerRef = this.tableRef?.querySelector('thead') ?? null;

    return this.headerRef;
  };

  $headerWrapper = (
    id: string,
    className: string,
    children: Array<HTMLElement>
  ) =>
    this.$element('tr', {
      attributes: { class: className, id: id },
      children: children,
    });

  async build(): Promise<HTMLElement> {
    if (!this.headerRef) throw new DomError('Cannot select the dom header ref');
    if (!this.headers.getConfig()) return this.headerRef;

    const groupedHeaders = this.headers.groupByHeadersGroup(
      this.config.headers ?? []
    );

    if (!Object.keys(groupedHeaders).length) return this.headerRef;
    // if no groupheader is present, build only columns
    if (
      Object.keys(groupedHeaders).length === 1 &&
      Object.keys(groupedHeaders).some((el) => el.startsWith(HeaderGroup.NONE))
    ) {
      const headerCells = this.$mainRowHeader(groupedHeaders);
      const mainHeaderWrapper = this.$headerWrapper(
        this.MAIN_HEADER_ID,
        'main_header',
        headerCells
      );

      this.headerRef?.append(mainHeaderWrapper);
    } else {
      const [groupHeaderCells, headersCells]: Array<Array<HTMLElement>> =
        await Promise.all([
          this.$groupHeaders(groupedHeaders),
          this.$mainHeader(groupedHeaders),
        ]);
      const groupHeaderWrapper = this.$headerWrapper(
        this.GROUP_HEADER_ID,
        'group_header',
        groupHeaderCells
      );
      const mainHeaderWrapper = this.$headerWrapper(
        this.MAIN_HEADER_ID,
        'main_header',
        headersCells
      );

      this.headerRef?.append(groupHeaderWrapper, mainHeaderWrapper);
    }

    return this.headerRef;
  }

  /**
   * Build main headers columns
   */
  private async $mainHeader(
    groupedHeaders: Record<string, CustomConfigColumns[]>
  ): Promise<Array<HTMLElement>> {
    const headerCells: Array<HTMLElement> = [];

    for (const [group, columns] of Object.entries(groupedHeaders)) {
      if (!group.startsWith(HeaderGroup.NONE)) {
        for (let i = 0; i < columns.length; i++) {
          headerCells.push(
            this.$element('th', {
              classList: ['colspan-border'],
              attributes: {
                rowspan: '1',
                colspan: '1',
              },
              content: columns[i].title,
              style: columns[i].style,
            })
          );
        }
      }
    }

    return headerCells;
  }

  private $mainRowHeader(
    groupedHeaders: Record<string, CustomConfigColumns[]>
  ) {
    const headerCells: Array<HTMLElement> = [];
    for (const [group, columns] of Object.entries(groupedHeaders)) {
      for (let i = 0; i < columns.length; i++) {
        if (group.startsWith(HeaderGroup.NONE)) {
          headerCells.push(
            this.$element('th', {
              classList: ['colspan-border'],
              attributes: {
                rowspan: '1',
                colspan: '1',
              },
              content: columns[i].title,
              style: columns[i].style,
            })
          );
        }
      }
    }

    return headerCells;
  }

  /**
   * Build Group headers
   */
  private async $groupHeaders(
    groupedHeaders: Record<string, CustomConfigColumns[]>
  ): Promise<Array<HTMLElement>> {
    const groupHeaderCells: Array<HTMLElement> = [];
    for (const [group, columns] of Object.entries(groupedHeaders)) {
      if (!group.startsWith(HeaderGroup.NONE)) {
        groupHeaderCells.push(
          this.$element('th', {
            classList: ['colspan-border'],
            attributes: {
              rowspan: '1',
              colspan: String(columns.length),
            },
            content: group,
          })
        );
      } else {
        for (let i = 0; i < columns.length; i++) {
          groupHeaderCells.push(
            this.$element('th', {
              classList: ['colspan-border'],
              attributes: {
                rowspan: '2',
                colspan: '1',
              },
              content: columns[i].title,
              style: columns[i].style,
            })
          );
        }
      }
    }

    return groupHeaderCells;
  }
}

export default HeaderLxDom;
