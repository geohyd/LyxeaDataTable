import LyxeaDatatable from 'lx_dt';
import { dataTableData } from './data';

window.lx = LyxeaDatatable;

const table = new LyxeaDatatable('#myTable', {
  data: dataTableData,
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
            maSuperConfig: 'Ohé toto',
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

/**
 * Transformer
 */
table.tranformer.add((data) =>
  data.map((d) => {
    d.first_name = d.first_name.toUpperCase();
    return d;
  })
);

table.init();
