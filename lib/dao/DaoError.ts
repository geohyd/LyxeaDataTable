class DaoError extends Error {
  constructor(message: string) {
    super(`Data Acquisition Error : ${message}`);
    this.name = 'DaoError';
    this.stack = new Error().stack;
  }
}

export default DaoError;
