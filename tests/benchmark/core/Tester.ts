class BenchmarkTesting {
  startTs?: number;
  endTs?: number;

  constructor() {}

  start(): void {
    this.startTs = performance.now();
  }

  end(): void {
    this.endTs = performance.now();
  }

  getResult(): number {
    if (!this.endTs || !this.startTs) return 0;
    return this.endTs - this.startTs;
  }
}

export default BenchmarkTesting;
