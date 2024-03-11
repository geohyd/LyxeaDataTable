import { LxConfigObject } from '../core/LyxeaDatatable';
export type RendederConfig = {};
declare class LxRenderer {
    renderers: Array<RendederConfig>;
    constructor(config: LxConfigObject);
    number2DigitMax(data: any | null): any;
    booleanString: (data: boolean) => "Oui" | "Non";
    cutLongText: (data: any) => any;
    uppercase: (data: any) => any;
    numberToFixed: (data: any) => string | undefined;
}
export default LxRenderer;
