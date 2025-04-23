import { CustomRenderers } from './Renderer';
interface Cols {
  name: string;
}
interface D extends Cols {}

class Dto<T> {
  getDataFormatted(data: Array<T>, columns: Array<D>): Array<any> {
    return data
      .map((el: any) => {
        const newObj: { [key: string]: any } = {};
        columns.forEach((col: any) => {
          if (el[col.name]) {
            newObj[col.name] = el[col.name];
          }
        });
        return newObj;
      })
      .filter((newObj) => Object.keys(newObj).length > 0);
  }

  addRenderer(name: string, renderer: any) {
    if (typeof name !== 'string' || !renderer) {
      throw new Error('Invalid renderer declaration');
    }
    CustomRenderers[name] = renderer;
  }

  addDynamicRenderer(
    pattern: RegExp,
    handler: (match: RegExpMatchArray) => any
  ) {
    if (!CustomRenderers._dynamic) {
      CustomRenderers._dynamic = [];
    }
    CustomRenderers._dynamic.push({ pattern, handler });
  }
}

export default Dto;
