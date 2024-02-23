/**
 * @jest-environment jsdom
 */

import { ConfigColumns } from 'datatables.net-dt';
import DtColumns from '../../../lib/core/DtColumns';

describe('DtColumns', () => {
  describe('constructor', () => {
    it('should initialize with empty colsDef if not provided', () => {
      const dtColumns = new DtColumns();
      expect(dtColumns.colsDef).toEqual(undefined);
    });
  });

  describe('get', () => {
    it('should return empty array if colsDef is not provided', () => {
      const dtColumns = new DtColumns();
      expect(dtColumns.colsDef).toEqual(undefined);
    });

    it('should return colsDef if provided', () => {
      const colsDef = [
        { name: 'Name', type: 'string' },
        { name: 'Age', type: 'number' },
      ];
      const dtColumns = new DtColumns(colsDef);
      expect(dtColumns.colsDef).toEqual(colsDef);
    });
  });
});

describe('DtColumns', () => {
  describe('mergeColumns', () => {
    it('should merge baseColumns with customColumns', () => {
      const baseColumns = [
        { name: 'id' },
        { name: 'name', class: 'classname' },
      ];
      const customColumns = [
        { name: 'name', title: 'Name' },
        { name: 'age', title: 'Age' },
      ];
      const mergedColumns = DtColumns.mergeColumns(baseColumns, customColumns);
      expect(mergedColumns).toEqual([
        { name: 'id' },
        { class: 'classname', name: 'name', title: 'Name' },
        { name: 'age', title: 'Age' },
      ]);
    });

    it('should keep customColumns if baseColumns is empty', () => {
      const baseColumns: ConfigColumns[] = [];
      const customColumns = [
        { name: 'name', title: 'Name' },
        { name: 'age', title: 'Age' },
      ];
      const mergedColumns = DtColumns.mergeColumns(baseColumns, customColumns);
      expect(mergedColumns).toEqual(customColumns);
    });

    it('should keep baseColumns if customColumns is empty', () => {
      const baseColumns = [{ name: 'id' }, { name: 'name' }];
      const customColumns: ConfigColumns[] = [];
      const mergedColumns = DtColumns.mergeColumns(baseColumns, customColumns);
      expect(mergedColumns).toEqual(baseColumns);
    });

    it('should return an empty array if both baseColumns and customColumns are empty', () => {
      const baseColumns: ConfigColumns[] = [];
      const customColumns: ConfigColumns[] = [];
      const mergedColumns = DtColumns.mergeColumns(baseColumns, customColumns);
      expect(mergedColumns).toEqual([]);
    });

    it('should return an empty array if no matching columns found', () => {
      const baseColumns = [{ name: 'id' }, { name: 'name' }];
      const customColumns = [
        { name: 'age', label: 'Age' },
        { name: 'gender', label: 'Gender' },
      ];
      const mergedColumns = DtColumns.mergeColumns(baseColumns, customColumns);
      expect(mergedColumns).toEqual([
        { name: 'id' },
        { name: 'name' },
        { name: 'age', label: 'Age' },
        { name: 'gender', label: 'Gender' },
      ]);
    });
  });
});

describe('Default Value key test', () => {
  it('should return columnsConfig unchanged if defaultKeyConfig is null', () => {
    const defaultKeyConfig = null;
    const columnsConfig = [{ name: 'column1' }, { name: 'column2' }];
    const result = DtColumns.setDefaultKeyValue(
      defaultKeyConfig,
      columnsConfig
    );
    expect(result).toEqual(columnsConfig);
  });

  it('should not set default values for columns if they are not present in defaultKeyConfig', () => {
    const defaultKeyConfig = { width: 100, sortable: true };
    const columnsConfig = [
      { name: 'column1' },
      { name: 'column2', visible: true },
    ];
    const expectedResult = [
      { name: 'column1', width: 100, sortable: true },
      { name: 'column2', visible: true, width: 100, sortable: true },
    ];

    const result = DtColumns.setDefaultKeyValue(
      defaultKeyConfig,
      columnsConfig
    );
    expect(result).toEqual(expectedResult);
  });

  it('should not override already present key', () => {
    const defaultKeyConfig = { width: 100, sortable: true };
    const columnsConfig = [
      { name: 'column1', width: '200' },
      { name: 'column2', visible: true },
    ];
    const expectedResult = [
      { name: 'column1', width: '200', sortable: true },
      { name: 'column2', visible: true, width: 100, sortable: true },
    ];

    const result = DtColumns.setDefaultKeyValue(
      defaultKeyConfig,
      columnsConfig
    );
    expect(result).toEqual(expectedResult);
  });

  it('should return an empty array if columnsConfig is an empty array', () => {
    const defaultKeyConfig = { width: 100, sortable: true };
    const columnsConfig: Array<ConfigColumns> = [];
    const result = DtColumns.setDefaultKeyValue(
      defaultKeyConfig,
      columnsConfig
    );
    expect(result).toEqual([]);
  });
});
