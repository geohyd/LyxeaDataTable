declare class State<T> {
    #private;
    constructor(initialValue: T);
    get value(): T;
    set value(newValue: T);
    getState(): T;
    getState<K extends keyof T>(key: K): T[K];
    setState(newState: T | ((state: T) => T)): T;
    subscribe(listener: Function): () => void;
}
export default State;
