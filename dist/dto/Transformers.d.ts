declare class Transformers<T> {
    transformers: Array<(data: Array<T>) => Array<T>>;
    constructor();
    /**
     * Add transformer to the data submitted
     */
    add: (transformer: (data: Array<T>) => Array<T>) => number;
    /**
     * Execute each transformer
     */
    exec: (data: Array<T>) => Array<T>;
}
export default Transformers;
