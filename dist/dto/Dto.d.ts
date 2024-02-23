interface Cols {
  name: string;
}
interface D extends Cols {}
declare class Dto<T> {
  getDataFormatted(data: Array<T>, columns: Array<D>): Array<any>;
}
export default Dto;
