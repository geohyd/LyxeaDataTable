import Transformers from '../../../lib/dto/Transformers';

describe('Transformers', () => {
  describe('add', () => {
    it('should add a transformer to the transformers array', () => {
      const transformers = new Transformers<number>();
      const transformer = (data: Array<number>) => data.map((item) => item * 2);
      transformers.add(transformer);
      expect(transformers.transformers).toContain(transformer);
    });
  });

  describe('exec', () => {
    it('should execute each transformer and return the transformed data', () => {
      const transformers = new Transformers<number>();
      const transformer1 = (data: Array<number>) =>
        data.map((item) => item * 2);
      const transformer2 = (data: Array<number>) =>
        data.filter((item) => item % 2 === 0);
      transformers.add(transformer1);
      transformers.add(transformer2);
      const testData = [1, 2, 3, 4, 5];
      const expectedResult = [2, 4, 6, 8, 10];
      expect(transformers.exec(testData)).toEqual(expectedResult);
    });

    it('should return the original data if no transformers are added', () => {
      const transformers = new Transformers<number>();
      const testData = [1, 2, 3, 4, 5];
      expect(transformers.exec(testData)).toEqual(testData);
    });
  });
});
