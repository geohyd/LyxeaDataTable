import AbstractLxDom from '../../../dom/AbstractLxDom';
import { ActionArgsWithEffect } from '../Action';

class ActionLxDom extends AbstractLxDom {
  constructor() {
    super();
  }

  $actionButton({
    name,
    label,
    iconTitle,
    icon,
    style,
    effect,
  }: ActionArgsWithEffect): HTMLButtonElement {
    const defaultStyle: Record<string, Partial<CSSStyleDeclaration>> = {
      padding: '4px',
    };
    let _icon;
    if (iconTitle) {
      _icon = this.$element('i', {
        classList: ['fa', iconTitle],
      });
    }
    if (icon) {
      _icon = icon.cloneNode(true) as HTMLElement;
    }

    return this.$element<HTMLButtonElement>('button', {
      classList: ['btn'],
      children: [_icon!],
      attributes: {
        name: name,
        'aria-label': label ?? name,
      },
      style: { ...defaultStyle, ...style },
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
