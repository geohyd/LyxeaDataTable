import AbstractLxDom from '../../../dom/AbstractLxDom';
import { ActionArgsWithEffect } from '../Action';
declare class ActionLxDom extends AbstractLxDom {
    constructor();
    $actionButton({ name, title, icon, iconClassList, btnClassList, style, effect, }: ActionArgsWithEffect): HTMLButtonElement;
    defineDefaultCellStyle(cell: HTMLElement): void;
}
export default ActionLxDom;
