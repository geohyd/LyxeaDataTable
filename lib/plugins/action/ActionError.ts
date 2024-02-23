class ActionError extends Error {
  constructor(message: string) {
    super(`Action plugin Error : ${message}`);
    this.name = 'ActionError';
    this.stack = new Error().stack;
  }
}

export default ActionError;
