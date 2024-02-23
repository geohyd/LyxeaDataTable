import LyxeaDatatable from 'lx_dt';
import { dataTableData } from './data';

window.lx = LyxeaDatatable;

const icon = document.createElement('span');
icon.style.display = 'flex';
icon.style.justifyContent = 'center';
icon.style.alignItems = 'center';
icon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-0-circle" viewBox="0 0 16 16">
<path d="M7.988 12.158c-1.851 0-2.941-1.57-2.941-3.99V7.84c0-2.408 1.101-3.996 2.965-3.996 1.857 0 2.935 1.57 2.935 3.996v.328c0 2.408-1.101 3.99-2.959 3.99M8 4.951c-1.008 0-1.629 1.09-1.629 2.895v.31c0 1.81.627 2.895 1.629 2.895s1.623-1.09 1.623-2.895v-.31c0-1.8-.621-2.895-1.623-2.895"/>
<path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8"/>
</svg>`;

const table = new LyxeaDatatable({
  dom: '#myTable',
  data: dataTableData,
  fixedHeader: true,
  paging: true,
  responsive: true,
  lxConfig: {
    columnsDefaultKey: {
      defaultContent: '',
      michel: 'hoho',
      maSuperConfig: 'Wahoo',
    },
    row_action: {
      width: '100px',
      className: 'ma-super-classe',
      actions: [
        {
          icon: icon,
          style: {
            backgroundColor: 'blue',
          },
          name: 'edit',
          url: 'http://google.com/search?q={first_name}',
          blank: true,
          onError: (err) => console.warn(err.message),
        },
        {
          icon: icon,
          style: {
            backgroundColor: 'red',
          },
          name: 'edit',
          url: '/api/v1/editForm/ariactif/{_id}',
          customAction: 'SURVEA_EDIT',
          blank: true,
          effect: (rowData) => console.log(rowData),
        },
      ],
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
      {
        columns: [
          {
            data: null,
            name: 'Actions',
            title: 'Action',
          },
        ],
      },
    ],
  },
});

await table.init();
