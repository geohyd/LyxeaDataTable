class Transformers<T> {
  transformers: Array<(data: Array<T>) => Array<T>>;

  constructor() {
    this.transformers = [];
  }

  /**
   * Add transformer to the data submitted
   */
  add = (transformer: (data: Array<T>) => Array<T>) =>
    this.transformers.push(transformer);

  /**
   * Execute each transformer
   */
  exec = (data: Array<T>): Array<T> => {
    this.transformers.forEach((transformer) => {
      data = transformer(data);
    });
    return data;
  };
}

export default Transformers;
