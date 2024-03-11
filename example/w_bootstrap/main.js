import LyxeaDatatable from 'lx_dt';
import { dataTableData } from './data';
import $ from 'jquery';

window.lx = LyxeaDatatable;

const table = new LyxeaDatatable('#myTable', {
  data: dataTableData,
  scrollCollapse: true,
  scrollY: 200,
  lxConfig: {
    filters: true,
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

const table2 = new LyxeaDatatable('#myTable2', {
  data: dataTableData,
  scrollCollapse: true,
  scrollY: 200,

  lxConfig: {
    filters: true,
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
          { data: 'last_name', name: 'last_name', title: 'Nom' },
          { data: 'start_date', name: 'start_date', title: 'Date' },
        ],
      },
    ],
  },
});

table2.init();

const table3 = new LyxeaDatatable('#myTable3', {
  data: dataTableData,

  lxConfig: {
    filters: true,
    handleBootrapTabChange: false,
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

table3.init();
window.table3 = table3;
