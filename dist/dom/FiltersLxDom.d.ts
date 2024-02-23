import AbstractLxDom from './AbstractLxDom';
import DataTable from 'datatables.net';
declare class FiltersLxDom extends AbstractLxDom {
  #private;
  constructor(header: Node);
  generate<T>(
    columnsLength: number,
    instance: DataTable<T>,
    callBack: (e: Event) => void
  ): Node;
  private $headerGroup;
  private $filterInputs;
  private $filterIcon;
}
export default FiltersLxDom;
