import Dto from '../../../lib/dto/Dto';

describe('Dto', () => {
  let dto: Dto<{ id: number; name: string; age: number }>;

  beforeEach(() => {
    dto = new Dto();
  });

  describe('filterDataFromHeader', () => {
    it('should filter data based on specified columns', () => {
      const data = [
        { id: 1, name: 'John', age: 30 },
        { id: 2, name: 'Jane', age: 25 },
      ];
      const expected = [
        { name: 'John', age: 30 },
        { name: 'Jane', age: 25 },
      ];
      const columns = [{ name: 'name' }, { name: 'age' }];
      const filteredData = dto.getDataFormatted(data, columns);
      expect(filteredData).toEqual(expected);
    });

    it('should handle columns not present in data', () => {
      const data = [{ id: 1, name: 'John', age: 30 }];
      const columns = [{ name: 'name' }, { name: 'email' }];
      const expected = [{ name: 'John' }];
      const filteredData = dto.getDataFormatted(data, columns);
      expect(filteredData).toEqual(expected);
    });

    it('should handle empty data', () => {
      const data: Array<{ name: string }> = [];
      const columns = [{ name: 'name' }, { name: 'age' }];
      const filteredData = dto.getDataFormatted(data as any, columns);
      expect(filteredData).toEqual([]);
    });

    it('should handle empty columns', () => {
      const data = [{ id: 1, name: 'John', age: 30 }];
      const columns: Array<any> = [];
      const filteredData = dto.getDataFormatted(data, columns);
      expect(filteredData).toEqual([]);
    });

    it('should return empty array if no matching data found', () => {
      const data = [{ id: 1, name: 'John', age: 30 }];
      const columns = [{ name: 'email' }];
      const filteredData = dto.getDataFormatted(data, columns);
      expect(filteredData).toEqual([]);
    });

    it('should handle different data types', () => {
      const data = [
        { id: '1', name: 'John', age: '30' },
        { id: '2', name: 'Jane', age: '25' },
      ];
      const columns = [{ name: 'name' }, { name: 'age' }];
      const expected = [
        { name: 'John', age: '30' },
        { name: 'Jane', age: '25' },
      ];
      const filteredData = dto.getDataFormatted(data as any, columns);
      expect(filteredData).toEqual(expected);
    });
  });
});
