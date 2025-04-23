import { default as AbstractLxDom } from '../../../dom/AbstractLxDom';
import { ActionArgsWithEffect } from '../Action';

declare class ActionLxDom extends AbstractLxDom {
    constructor();
    $actionButton({ name, label, iconTitle, icon, style, effect, }: ActionArgsWithEffect): HTMLButtonElement;
    defineDefaultCellStyle(cell: HTMLElement): void;
}
export default ActionLxDom;
