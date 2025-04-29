import AbstractLxDom from '../../../dom/AbstractLxDom';
import { ActionArgsWithEffect } from '../Action';

class ActionLxDom extends AbstractLxDom {
  constructor() {
    super();
  }

  $actionButton({
    name,
    title,
    icon,
    iconClassList,
    btnClassList,
    style,
    effect,
  }: ActionArgsWithEffect): HTMLButtonElement {
    let _icon;
    if (iconClassList) {
      _icon = this.$element('i', {
        classList: ['fa'].concat(iconClassList || []),
      });
    }
    if (icon) {
      _icon = icon.cloneNode(true) as HTMLElement;
    }

    return this.$element<HTMLButtonElement>('button', {
      classList: ['btn'].concat(btnClassList || []),
      children: [_icon!],
      attributes: {
        name: name,
        title: title ?? "",
        'aria-label': title ?? name,
      },
      style: { ...style },
      onClick: Array.isArray(effect) ? effect : [effect],
    });
  }

  defineDefaultCellStyle(cell: HTMLElement) {
    cell.style.display = 'flex';
    cell.style.justifyContent = 'center';
    cell.style.alignItems = 'center';
    cell.style.gap = '6px';
  }
}

export default ActionLxDom;
