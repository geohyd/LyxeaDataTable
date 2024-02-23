import parseStringWithData from '../../../lib/utils/parseStringWithData';

describe('parseStringWithData', () => {
  it('should return the original URL if no placeholders are found', () => {
    const url = 'https://example.com/api/data';
    const rowData = {};
    const result = parseStringWithData(url, rowData);
    expect(result).toEqual(url);
  });

  it('should replace placeholders in the URL with corresponding values from rowData', () => {
    const url = 'https://example.com/api/{resource}/{id}';
    const rowData = { resource: 'users', id: 123 };
    const expectedUrl = 'https://example.com/api/users/123';
    const result = parseStringWithData(url, rowData);
    expect(result).toEqual(expectedUrl);
  });

  it('should handle URLs with multiple placeholders', () => {
    const url = 'https://example.com/api/{resource}/{id}/details';
    const rowData = { resource: 'products', id: 456 };
    const expectedUrl = 'https://example.com/api/products/456/details';
    const result = parseStringWithData(url, rowData);
    expect(result).toEqual(expectedUrl);
  });

  it('should handle URLs with duplicate placeholders', () => {
    const url = 'https://example.com/api/{resource}/{resource}';
    const rowData = { resource: 'items' };
    const expectedUrl = 'https://example.com/api/items/items';
    const result = parseStringWithData(url, rowData);
    expect(result).toEqual(expectedUrl);
  });

  it('should ignore placeholders without matching values in rowData', () => {
    const url = 'https://example.com/api/{resource}/{id}';
    const rowData = { resource: 'products' };
    const expectedUrl = 'https://example.com/api/products/{id}';
    const result = parseStringWithData(url, rowData);
    expect(result).toEqual(expectedUrl);
  });

  it('should return the original URL if rowData is empty', () => {
    const url = 'https://example.com/api/{resource}/{id}';
    const rowData = {};
    const result = parseStringWithData(url, rowData);
    expect(result).toEqual(url);
  });
});
