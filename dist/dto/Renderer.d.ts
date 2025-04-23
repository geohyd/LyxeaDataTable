import { LxConfigObject } from '../core/LyxeaDatatable';

declare const CustomRenderers: Record<string, any>;
declare class LxRenderer {
    constructor(config: LxConfigObject);
}
export default LxRenderer;
export { CustomRenderers };
