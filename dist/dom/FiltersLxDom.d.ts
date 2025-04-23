import { default as AbstractLxDom } from './AbstractLxDom';
import { default as DataTable } from 'datatables.net';

/**
 * Deprecated
 */
declare class FiltersLxDom extends AbstractLxDom {
    #private;
    constructor(header: Node);
    generate<T>(columnsLength: number, instance: DataTable<T>, callBack: (e: Event) => void): Node;
    private $headerGroup;
    private $filterInputs;
    private $filterIcon;
}
export default FiltersLxDom;
