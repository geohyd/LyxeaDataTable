import ActionError from './ActionError';
import { ConfigColumnDefs } from 'datatables.net-dt';
import ActionLxDom from './dom/ActionLxDom';
import CustomAction, { CustomActionDef } from './CustomAction';

export type ActionConfig = {
  width: string;
  className?: string;
  actions: Array<ActionArgs>;
};

export type ActionArgs = {
  name: string;
  icon?: HTMLElement;
  title?: string;
  iconClassList?: Array<string>;
  btnClassList?: Array<string>;
  style?: Record<string, Partial<CSSStyleDeclaration>>;
  url?: string;
  customAction?: string;
  blank?: boolean;
  onComplete?: (rowData: any) => void;
  onError?: (err: unknown, rowData: any) => void;
  effect?: ActionEffect;
};

export type ActionArgsWithEffect = ActionArgs &
  Required<Pick<ActionArgs, 'effect'>>;

export type ActionEffect = (
  rowData: any
) => void | Array<(rowData: any) => void>;

type LxAction = Array<() => void>;

class Action {
  actions?: Array<LxAction>;
  customActions?: Array<CustomActionDef>;

  #colWidth: string;
  #actionConfig: Array<ActionArgs>;
  #celllClassName?: string;

  #domBuilder: ActionLxDom;

  constructor({ width, className, actions }: ActionConfig) {
    this.actions = [];
    this.#colWidth = width;
    this.#celllClassName = className;
    this.#actionConfig = actions;
    this.#domBuilder = new ActionLxDom();
  }

  async generateColDefConfig(): Promise<ConfigColumnDefs> {
    return {
      data: null,
      defaultContent: '',
      targets: -1,
      width: this.#colWidth,
      createdCell: async (td, rowData) => {
        for (const action of this.#actionConfig) {
          /**
           * Generic effect configuration - effect is set on the object
           */
          if (action.effect) {
            this.#applyAction(td, rowData, <ActionArgsWithEffect>action);
          } else {
            /**
             * Custom effect predefined in CustomActionObject
             */
            if (action.customAction) {
              if (!action.url || action.url === '')
                throw new Error('Cannnot open URL, URL is missing');
              new CustomAction(action, this.parseUrlString.bind(this))
                .retrieve()
                .map((customAction) => {
                  if (customAction.name === action.customAction) {
                    action.effect = customAction.effect;
                    this.#applyAction(
                      td,
                      rowData,
                      <ActionArgsWithEffect>action
                    );
                  }
                });
            } else {
              /**
               * Generic url redirection
               */
              action.effect = (rowData) => {
                if (!action.url || action.url === '')
                  throw new Error('Cannnot open URL, URL is missing');
                const url = this.parseUrlString(action.url, rowData);
                window.open(url, action.blank ? '_blank' : '_self');
              };
              this.#applyAction(td, rowData, <ActionArgsWithEffect>action);
            }
          }
        }
      },
    };
  }

  #applyAction(td: Node, rowData: any, action: ActionArgsWithEffect) {
    const btn: HTMLButtonElement = this.#domBuilder.$actionButton(action);
    btn.addEventListener('click', async () => {
      try {
        await action.effect(rowData);

        if (action.onComplete) action.onComplete(rowData);
      } catch (err) {
        if (action.onError) action.onError(err, rowData);
      }
    });
    //this.#domBuilder.defineDefaultCellStyle(td as HTMLElement);
    if (this.#celllClassName)
      (td as HTMLElement).classList.add(this.#celllClassName);
    td.appendChild(btn);
  }

  _getUrlParams(url: string): Array<string> {
    const matches = Array.from(url.matchAll(/\{(.+?)\}/g));
    const result = Array.from(matches)
      .filter((match) => match[1] !== '}{')
      .map((match) => match[1]);

    return Array.from(new Set(result));
  }

  parseUrlString(url: string, rowData: { [key: string]: any }): string {
    const params = this._getUrlParams(url);
    if (!params.length) return url;
    params.forEach((param) => {
      if (url.includes(`{${param}}`) && rowData[param]) {
        url = url.replaceAll(`{${param}}`, rowData[param]);
      }
    });

    return url;
  }

  /**
   * @throws ActionError if an error occured
   */
  validateConfig(): Action {
    this.#actionConfig.map((config) => {
      if (!config.icon && !config.iconClassList)
        throw new ActionError('You must provide an icon name or an icon title');
      if (config.icon && !(config.icon instanceof HTMLElement))
        throw new ActionError('Icon must be of type HTMLElement');
      if (!config.name) throw new ActionError('Name is not set');
      if (!config.effect && !config.url)
        throw new ActionError('You must provide an URL or an Effect function');
      if (config.url && config.url === '') throw new ActionError('Invalid URL');

      if (config.effect && !(config.effect instanceof Function))
        throw new ActionError('Effect must be a function');
    });
    return this;
  }
}

export default Action;
