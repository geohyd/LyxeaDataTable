class DomError extends Error {
  constructor(message: string) {
    super(`DOM Error : ${message}`);
    this.name = 'DomError';
    this.stack = new Error().stack;
  }
}

export default DomError;
