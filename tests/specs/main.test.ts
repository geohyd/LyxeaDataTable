/**
 * @jest-environment jsdom
 */

/** @ts-ignore */
var $ = require( 'jquery' );
var DataTable = require( 'datatables.net' )(window, $);

describe("Datatable should be up", () => {
    test("dt is not null", () => {
        let table = new DataTable('#myTable');
        expect(table).toBeTruthy()
    })
})

test("init", () => {
    expect(1).toBe(1);
})