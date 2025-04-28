import { ButtonConfig, ConfigButtons } from 'datatables.net-dt';
import $ from 'jquery';

class DtButtons {
  getDefaults() {
    return [
      {
        extend: 'copyHtml5',
        exportOptions: {
          orthogonal: 'export',
        },
      },
      {
        extend: 'excelHtml5',
        exportOptions: {
          orthogonal: 'export',
        },
      },
      {
        extend: 'csvHtml5',
        exportOptions: {
          orthogonal: 'export',
        },
      },
      {
        text: 'JSON',
        action: function (_: any, dt: any) {
          var data = dt.rows({ orthogonal: 'export' }).data().toArray();
          // @ts-ignore
          $.fn.dataTable.fileSave(
            new Blob([JSON.stringify(data)]),
            'Exported_data.json'
          );
        },
      },
      'colvis',
    ];
  }

  parse(
    config: true | ConfigButtons | (string | ButtonConfig)[]
  ): true | ConfigButtons | (string | ButtonConfig)[] {
    if (!Array.isArray(config)) return config;
    config.forEach((c) => {
      switch (c) {
        case 'JSON':
          c = {
            text: 'JSON',
            action: function (_: any, dt: any) {
              var data = dt.buttons.exportData({ orthogonal: 'export_json' });
              // @ts-ignore
              $.fn.dataTable.fileSave(
                new Blob([JSON.stringify(data)]),
                'Exported_data.json'
              );
            },
          };
      }
    });

    return config;
  }
}

export default DtButtons;
