import { LxConfigObject } from '../core/LyxeaDatatable';
export type RendederConfig = {};
declare class LxRenderer {
    renderers: Array<RendederConfig>;
    constructor(config: LxConfigObject);
}
export default LxRenderer;
