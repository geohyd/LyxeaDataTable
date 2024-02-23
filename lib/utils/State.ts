class State<T> {
  #value;
  #listeners: Array<Function> = [];

  constructor(initialValue: T) {
    this.#value = initialValue;
  }

  get value() {
    return this.#value;
  }

  set value(newValue) {
    this.#value = newValue;
  }

  getState(): T;
  getState<K extends keyof T>(key: K): T[K];
  getState(key?: keyof T): T | T[keyof T] | undefined {
    if (key !== null && key !== undefined) return this.#value[key as keyof T];
    else return this.#value;
  }

  setState(newState: T | ((state: T) => T)): T {
    if (newState instanceof Function) {
      this.#value = newState(this.#value);
    } else {
      this.#value = newState;
    }

    this.#listeners.forEach((listener) => listener(this.#value));

    return this.#value;
  }

  subscribe(listener: Function) {
    this.#listeners.push(listener);

    return () => {
      this.#listeners = this.#listeners.filter((l) => l !== listener);
    };
  }
}

export default State;
