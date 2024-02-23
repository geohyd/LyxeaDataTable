/**
 * @jest-environment jsdom
 */

import { LxConfigObject } from '../../../dist/core/LyxeaDatatable';
import DtHeaders from '../../../lib/core/DtHeaders';
import { LxHeaderDef } from '../../../lib/core/LyxeaDatatable';

describe('DtHeaders', () => {
  describe('constructor', () => {
    it('should initialize with the provided config', () => {
      const config: LxConfigObject = {
        headers: [{ headerGroup: 'Group 1', columns: [] }],
      };
      const dtHeaders = new DtHeaders(config);
      expect(dtHeaders['config']).toEqual(config);
    });
    it('should initialize with the provided config from setter', () => {
      const config: LxConfigObject = {
        headers: [{ headerGroup: 'Group 1', columns: [] }],
      };
      const dtHeaders = new DtHeaders().setColsDef(config);
      expect(dtHeaders['config']).toEqual(config);
    });

    it('should initialize headersGroup as an empty array', () => {
      const config = { headers: [{ headerGroup: 'Group 1', columns: [] }] };
      const dtHeaders = new DtHeaders(config);
      expect(dtHeaders['headersGroup']).toEqual([]);
    });

    it('should initialize cols as an empty array', () => {
      const config = { headers: [{ headerGroup: 'Group 1', columns: [] }] };
      const dtHeaders = new DtHeaders(config);
      expect(dtHeaders['cols']).toEqual([]);
    });
  });

  describe('getColumns', () => {
    it('should return the cols array', () => {
      const config = { headers: [{ headerGroup: 'Group 1', columns: [] }] };
      const dtHeaders = new DtHeaders(config);
      expect(dtHeaders.getColumns()).toEqual([]);
    });
  });

  describe('getHeaders', () => {
    it('should return the headersGroup array', () => {
      const config = { headers: [{ headerGroup: 'Group 1', columns: [] }] };
      const dtHeaders = new DtHeaders(config);
      expect(dtHeaders.getGroupHeaders()).toEqual([]);
    });
  });

  describe('getConfig', () => {
    it('should return the config headers', () => {
      const config = { headers: [{ headerGroup: 'Group 1', columns: [] }] };
      const dtHeaders = new DtHeaders(config);
      expect(dtHeaders.getConfig()).toEqual(config);
    });

    it('should return undefined if config headers are not provided', () => {
      const dtHeaders = new DtHeaders({});
      expect(dtHeaders.getConfig()).toEqual({});
    });
  });

  describe('groupByHeadersGroup', () => {
    it('should group columns by headers group', () => {
      const dtHeaders = new DtHeaders({
        headers: [{ columns: [] }],
      });
      const columns = [
        {
          headerGroup: 'Group 1',
          columns: [
            { title: 'A', name: 'B' },
            { title: 'A', name: 'B' },
          ],
        },
        { columns: [{ title: 'A', name: 'B' }], headerGroup: 'Group 2' },
      ];
      const groupedColumns = dtHeaders.groupByHeadersGroup(columns);
      expect(groupedColumns['Group 1']).toEqual([
        { title: 'A', name: 'B' },
        { title: 'A', name: 'B' },
      ]);
      expect(groupedColumns['Group 2']).toEqual([{ title: 'A', name: 'B' }]);
    });

    it('should handle columns without header group', () => {
      const dtHeaders = new DtHeaders({
        headers: [{ columns: [] }],
      });
      const columns = [
        {
          headerGroup: 'Group 1',
          columns: [
            { title: 'A', name: 'B' },
            { title: 'A', name: 'B' },
          ],
        },
        { columns: [{ title: 'A', name: 'B' }] },
      ];
      const groupedColumns = dtHeaders.groupByHeadersGroup(columns);

      expect(groupedColumns['Group 1']).toEqual([
        { title: 'A', name: 'B' },
        { title: 'A', name: 'B' },
      ]);

      expect(groupedColumns['NONE_1']).toEqual([{ title: 'A', name: 'B' }]);
      expect(groupedColumns['Group 2']).toEqual(undefined);
    });

    it('should handle empty columns array', () => {
      const dtHeaders = new DtHeaders({});
      const columns: Array<LxHeaderDef> = [];
      const groupedColumns = dtHeaders.groupByHeadersGroup(columns);
      expect(groupedColumns).toEqual({});
    });
  });
});
