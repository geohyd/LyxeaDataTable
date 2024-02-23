import { LxConfigObject } from '@core/LyxeaDatatable';
import '../utils/fixToFixed';
import $ from 'jquery';
import dayjs from 'dayjs';

export type RendederConfig = {};

type MultiRender<T> = Array<(d: T, type: any, row: any, meta: any) => T>;

/** Multi render function to handle array of modifiers */
// original idea : https://datatables.net/forums/discussion/43160/multi-render-renderer
// @ts-ignore
$.fn.dataTable.render.multi =
  <T>(renderArray: MultiRender<T>) =>
  (d: T, type: any, row: any, meta: any) => {
    renderArray.forEach((render) => {
      if (render) d = render(d, type, row, meta);
    });
    return d;
  };

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

          const multiRender = config.renderer.map((renderer) => {
            if (typeof renderer === 'string') {
              if (renderer.startsWith('DATE_TO_FORMAT_')) {
                return (data: any) => {
                  const format = renderer.split('_').pop();
                  return dayjs(data).format(format);
                };
              }

              switch (renderer) {
                case 'DATE_DAY':
                  return (data: any) => dayjs(data).format('DD/MM/YYYY');
                case 'DATE':
                  return (data: any) => dayjs(data).format('DD/MM/YYYY HH:mm');
                case 'DATE_WITH_SECOND':
                  return (data: any) =>
                    dayjs(data).format('DD/MM/YYYY HH:mm:ss');
                case 'LOCAL_NUMBER':
                  return (data: any) => data.toLocaleString();
                case 'BOOLEAN_YESNO':
                  return this.booleanString;
                case 'NUMBER_FIXED_2':
                  return this.numberToFixed;
                case 'NUMBER_2_DIGIT_MAX':
                  return this.number2DigitMax;
                case 'CUT_LONG_TEXT':
                  return this.cutLongText;
                case 'PARSE_INT':
                  return (data: any) => parseInt(data);
                case 'CHECKBOX':
                  // @ts-ignore
                  config.checkboxes = {
                    selectRow: true,
                  };
                  break;
                case 'UPPERCASE':
                  return this.uppercase;
              }
            }
          });

          // @ts-ignore
          config.render = $.fn.dataTable.render.multi(multiRender);
        }
      });
  }

  number2DigitMax(data: any | null) {
    if (typeof data === 'number') {
      if (data % 1 === 0) return data;
      else return data.toFixed(2);
    } else if (typeof data === 'string') {
      const float = parseFloat(data);
      if (isNaN(float)) return data;
      if (float % 1 === 0) return data;
      else return float.toFixed(2);
    } else {
      return data;
    }
  }

  booleanString = (data: boolean) => (data === true ? 'Oui' : 'Non');

  cutLongText = (data: any) => {
    if (data.length < 30) return data;
    var esc = function (t: any) {
      return t
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
    };

    const shortened = esc(data).substr(0, 30);
    const d = esc(data);
    return (
      '<span class="ellipsis" title="' +
      esc(d) +
      '">' +
      shortened +
      '&#8230;</span>'
    );
  };

  uppercase = (data: any) =>
    typeof data === 'string' ? data.toUpperCase() : data;

  numberToFixed = (data: any) => {
    if (typeof data === 'number') {
      return data.toFixed(2);
    } else if (typeof data === 'string') {
      const float = parseFloat(data);
      if (isNaN(float)) return data;
      else return float.toFixed(2);
    }
  };
}

export default LxRenderer;
