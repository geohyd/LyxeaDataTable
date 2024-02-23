/**
 * @jest-environment jsdom
 */

test('hello', () => expect(1).toBe(1));

/* import LyxeaDatatable, {
  CustomDatatableConfig,
} from '../../../lib/core/LyxeaDatatable';

 test('Split config with lxConfig', () => {
  const config: CustomDatatableConfig = {
    dom: '#toto',
    lxConfig: {
      columns: [],
    },
  };
  const dt = new LyxeaDatatable({ ...config });

  const parsedConfig = dt._splitConfig(config);

  delete config.lxConfig;

  expect(parsedConfig.globalConfig).toEqual(config);
  expect(parsedConfig.lxConfig).toEqual({ columns: [] });
  expect(config).not.toHaveProperty('lxConfig');
});

test('Split config without lxConfig', () => {
  process.env.NODE_ENV = 'test';

  const config: CustomDatatableConfig = {
    dom: '#toto',
  };
  const dt = new LyxeaDatatable({ ...config });

  expect(config).not.toHaveProperty('lxConfig');

  const parsedConfig = dt._splitConfig(config);

  expect(parsedConfig.globalConfig).toEqual(config);
  expect(parsedConfig.lxConfig).toBeNull();
}); */
