import { LxConfigObject } from '@core/LyxeaDatatable';
import '../utils/fixToFixed';
import dayjs from 'dayjs';

const CustomRenderers: Record<string, any> = {
  DATE_DAY: {
    render: function (data: any, type: any) {
      if (type === 'display' || type === 'filter' || type === 'export') {
        return dayjs(data).format('DD/MM/YYYY');
      }
      return data;
    },
  },
  DATE_WITH_SECOND: {
    render: function (data: any, type: any) {
      if (type === 'display' || type === 'filter' || type === 'export') {
        return dayjs(data).format('DD/MM/YYYY HH:mm:ss');
      }
      return data;
    },
  },
  LOCAL_NUMBER: {
    render: function (data: any, type: any) {
      if (type === 'display' || type === 'filter' || type === 'export') {
        return data.toLocaleString();
      }
      return data;
    },
  },
  BOOLEAN_OUI_NON: {
    render: function (data: any, type: any) {
      if (type === 'display' || type === 'filter' || type === 'export') {
        return data === true ? 'Oui' : 'Non';
      }
      return data;
    },
  },
  NUMBER_FIXED_2: {
    render: function (data: any) {
      if (typeof data === 'number') {
        return data.toFixed(2);
      } else if (typeof data === 'string') {
        const float = parseFloat(data);
        if (isNaN(float)) return data;
        else return float.toFixed(2);
      }
    },
  },
  NUMBER_2_DIGIT_MAX: {
    render: function (data: any) {
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
    },
  },
  PARSE_INT: {
    render: function (data: any) {
      return parseInt(data);
    },
  },
  UPPERCASE: {
    render: (data: any) =>
      typeof data === 'string' ? data.toUpperCase() : data,
  },
  LOWERCASE: {
    render: (data: any) =>
      typeof data === 'string' ? data.toLowerCase() : data,
  },
  CUT_LONG_TEXT: {
    render: function (data: any, type: any) {
      if (type === 'display') {
        if (typeof data === 'string') {
          if (data.length > 30) {
            return data.substring(0, 28) + '…';
          }
        }
      }
      return data;
    },
  },
  CHECKBOX: {
    checkboxes: {
      selectRow: true,
    },
  },
  _dynamic: [
    {
      pattern: /^DATE_TO_FORMAT_(.+)$/,
      handler: (match: any) => {
        const format = match[1];
        return {
          render: function (data: any, type: any) {
            if (type === 'display' || type === 'filter' || type === 'export') {
              return dayjs(data).format(format);
            }
            return data;
          },
        };
      },
    },
  ],
};

function resolveRenderer(nameOrObject: any) {
  if (typeof nameOrObject === 'string') {
    if (nameOrObject in CustomRenderers) {
      // @ts-ignore
      return CustomRenderers[nameOrObject];
    }
    for (const dyn of CustomRenderers._dynamic || []) {
      const match = nameOrObject.match(dyn.pattern);
      if (match) {
        return dyn.handler(match);
      }
    }
    return {};
  }
  return nameOrObject;
}

class LxRenderer {
  constructor(config: LxConfigObject) {
    config.headers &&
      config.headers.map((headers) => {
        for (const config of headers.columns) {
          if (!config.renderer) continue;
          if (Array.isArray(config.renderer)) {
            console.warn(
              'Multiple renderers are not supported yet. Please use a single renderer.'
            );
            config.renderer = config.renderer[0];
          }
          const renderConf = resolveRenderer(config.renderer);
          if (renderConf.render) {
            config.render = renderConf.render;
          }
          if (renderConf.createdCell) {
            config.createdCell = renderConf.createdCell;
          }
          if (renderConf.checkboxes) {
            // @ts-ignore
            config.checkboxes = renderConf.checkboxes;
          }
        }
      });
  }
}

export default LxRenderer;
export { CustomRenderers };
