import { LxConfigObject } from '@core/LyxeaDatatable';
import '../utils/renderer';
import $ from 'jquery';

export type RendederConfig = {};

class LxRenderer {
  renderers: Array<RendederConfig>;
  constructor(config: LxConfigObject) {
    this.renderers = [];
    config.headers &&
      config.headers.map((headers) => {
        for (const config of headers.columns) {
          if (!config.renderer) continue;
          if (!Array.isArray(config.renderer))
            config.renderer = Array(config.renderer);

          const multiRender = config.renderer.map((render) => {
            if (typeof render === 'string') {
              if (render.startsWith('DATE_TO_FORMAT_')) {
                config.type = 'date-uk';
                // @ts-ignore
                config.render = $.fn.dataTable.render.dateFormat(
                  render.split('_').pop()
                );
              }

              switch (render) {
                case 'DATE':
                  config.type = 'date-uk';
                  config.render =
                    // @ts-ignore
                    $.fn.dataTable.render.dateFormat('DD/MM/YYYY HH:mm');
                  break;
                case 'DATE_WITH_SECOND':
                  config.type = 'date-uk';
                  // @ts-ignore
                  config.render = $.fn.dataTable.render.dateFormat(
                    'DD/MM/YYYY HH:mm:ss'
                  );
                  break;
                case 'LOCAL_NUMBER':
                  // @ts-ignore
                  config.render = $.fn.dataTable.render.localeNumber();
                  break;
                case 'BOOLEAN_YESNO':
                  // @ts-ignore
                  config.render = $.fn.dataTable.render.boolToText(
                    'Oui',
                    'Non'
                  );
                  break;
                case 'NUMBER_FIXED_2':
                  // @ts-ignore
                  config.render = $.fn.dataTable.render.toFixed(2);
                  break;
                case 'NUMBER_2_DIGIT_MAX':
                  // @ts-ignore
                  config.render = $.fn.dataTable.render.parseFloat(2);
                  break;
                case 'CUT_LONG_TEXT':
                  // @ts-ignore
                  config.render = $.fn.dataTable.render.ellipsis(30, true);
                  break;
                case 'PARSE_INT':
                  // @ts-ignore
                  config.render = $.fn.dataTable.render.parseInt();
                  break;
                case 'CHECKBOX':
                  // @ts-ignore
                  config.checkboxes = {
                    selectRow: true,
                  };
                  break;
                case 'EDITABLE':
                  // @ts-ignore
                  config.render = $.fn.dataTable.render.editableCol();
              }
            }
          });

          // @ts-ignore
          $.fn.dataTable.render.multi(multiRender);
        }
      });
  }
}

export default LxRenderer;
