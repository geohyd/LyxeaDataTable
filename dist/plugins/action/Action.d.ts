import { ConfigColumnDefs } from 'datatables.net-dt';
import { CustomActionDef } from './CustomAction';

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
export type ActionArgsWithEffect = ActionArgs & Required<Pick<ActionArgs, 'effect'>>;
export type ActionEffect = (rowData: any) => void | Array<(rowData: any) => void>;
type LxAction = Array<() => void>;
declare class Action {
    #private;
    actions?: Array<LxAction>;
    customActions?: Array<CustomActionDef>;
    constructor({ width, className, actions }: ActionConfig);
    generateColDefConfig(): Promise<ConfigColumnDefs>;
    _getUrlParams(url: string): Array<string>;
    parseUrlString(url: string, rowData: {
        [key: string]: any;
    }): string;
    /**
     * @throws ActionError if an error occured
     */
    validateConfig(): Action;
}
export default Action;
