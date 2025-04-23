interface Cols {
    name: string;
}
interface D extends Cols {
}
declare class Dto<T> {
    getDataFormatted(data: Array<T>, columns: Array<D>): Array<any>;
    addRenderer(name: string, renderer: any): void;
    addDynamicRenderer(pattern: RegExp, handler: (match: RegExpMatchArray) => any): void;
}
export default Dto;
