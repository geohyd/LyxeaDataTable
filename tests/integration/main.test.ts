/**
 * @jest-environment jsdom
 */

/** @ts-ignore */
import $ from 'jquery';
/**
 * import this for impletement DOM environnement && `@jest-environment jsdom for testing datatable`
 */
var DataTable = require('datatables.net')(window, $);

describe('Datatable should be up', () => {
  test('dt is not null', () => {
    let table = new DataTable('#myTable');
    expect(table).toBeTruthy();
  });
});
