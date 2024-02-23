/**
 * @jest-environment jsdom
 */

/* import LyxeaDatatable from '../../../lib/core/LyxeaDatatable';
import BenchmarkTesting from '../core/Tester';
import { dataTableData } from '../fixtures/data'; */

function moyCalc(array: Array<number>) {
  let sum = 0;
  array.forEach((val) => (sum += val));

  return sum / array.length;
}

describe('performarance test', () => {
  it('100 loop test', async () => {
    /*
    const res: Array<number> = [];
    for (let i = 0; i < 100; i++) {
      const tableDiv = document.createElement('div');
      tableDiv.setAttribute('id', 'test');
      document.body.appendChild(tableDiv);

      const tester = new BenchmarkTesting();

      tester.start();
      const table = new LyxeaDatatable({
        dom: '#test',
        data: dataTableData,
        fixedHeader: true,
        paging: false,
        lxConfig: {
          columnsDefaultKey: {
            defaultContent: '',
            michel: 'hoho',
            maSuperConfig: 'Wahoo',
          },
          headers: [
            {
              columns: [
                {
                  data: 'first_name',
                  name: 'first_name',
                  title: 'Prénom',
                  className: 'salut',
                },
              ],
            },
            {
              headerGroup: 'Mon super groupe',
              columns: [
                { data: 'last_name', name: 'last_name', title: 'Nom' },
                { data: 'start_date', name: 'start_date', title: 'Date' },
              ],
            },
          ],
        },
      });

      await table.init();

      tester.end();

      console.log(tester.getResult());

      res.push(tester.getResult());
    }

    expect(moyCalc(res)).toBeLessThan(1); 
    */
  });
});
