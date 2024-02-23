import { CustomDatatableConfig, ParsedConfig } from './LyxeaDatatable';

class ConfigError extends Error {
  constructor(message: string) {
    super(`Configuration Error : ${message}`);
    this.name = 'ConfigError';
    this.stack = new Error().stack;
  }
}

class AbstractLyxeaDatatable {
  instance: any | null;

  constructor() {}

  initEvent = (data: any) =>
    new CustomEvent('datatable:init', {
      detail: data,
    });

  validateConfig<T>(
    dtConfig: CustomDatatableConfig<T> | undefined
  ): CustomDatatableConfig<T> | never {
    // TO complete if needed.
    if (!dtConfig) throw new ConfigError('Object not found');

    if (!dtConfig.data && !dtConfig.lxConfig?.url)
      throw new ConfigError('You must provide data source or an URL');

    if (dtConfig.lxConfig) {
      if (dtConfig.lxConfig.row_action) {
        if (!dtConfig.lxConfig.row_action.width) {
          throw new Error('Param width is missing from row_action');
        }
        if (!dtConfig.lxConfig.row_action.actions) {
          throw new Error('Param actions is missing from row_action');
        }
        if (!Array.isArray(dtConfig.lxConfig.row_action.actions)) {
          throw new TypeError('Param actions must be of type Array');
        }
      }
    }

    return dtConfig;
  }

  _splitConfig<T>(config: CustomDatatableConfig<T>): ParsedConfig {
    let lxConfig = null;
    let standardConfig = null;

    if ('lxConfig' in config) {
      lxConfig = config.lxConfig;
      delete config.lxConfig;
      standardConfig = config;
    } else {
      standardConfig = config;
    }

    return { standardConfig, lxConfig };
  }
}

export default AbstractLyxeaDatatable;
