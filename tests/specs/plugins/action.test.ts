/**
 * @jest-environment jsdom
 */

import Action, { ActionConfig } from '../../../lib/plugins/action/Action';
import ActionError from '../../../lib/plugins/action/ActionError';

describe('Action', () => {
  describe('validateConfig', () => {
    it('should throw an ActionError if icon and iconClassList are not provided', () => {
      const config: ActionConfig = {
        width: '50px',
        actions: [
          { name: 'action1', url: 'url1', blank: true, effect: () => {} },
        ],
      };
      const action = new Action(config);
      expect(() => action.validateConfig()).toThrow(ActionError);
    });

    it('should throw an ActionError if icon is not type HTMLElement', () => {
      const config: ActionConfig = {
        width: '50px',
        actions: [
          {
            name: 'test',
            // @ts-ignore
            icon: 'icon1',
            url: 'url1',
            blank: true,
            effect: () => {},
          },
        ],
      };
      const action = new Action(config);
      expect(() => action.validateConfig()).toThrow(ActionError);
    });

    it('should throw an ActionError if name is not set', () => {
      const config: ActionConfig = {
        width: '50px',
        actions: [
          // @ts-ignore
          { iconTitle: 'icon1', url: 'url1', blank: true, effect: () => {} },
        ],
      };
      const action = new Action(config);
      expect(() => action.validateConfig()).toThrow(ActionError);
    });

    it('should throw an ActionError if effect and url is not set', () => {
      const config: ActionConfig = {
        width: '50px',
        actions: [
          // @ts-ignore
          { iconTitle: 'icon1', name: 'action1', blank: true },
        ],
      };
      const action = new Action(config);
      expect(() => action.validateConfig()).toThrow(ActionError);
    });

    it('should throw an ActionError if effect is not a function', () => {
      const config: ActionConfig = {
        width: '50px',
        actions: [
          // @ts-ignore
          { iconTitle: 'icon1', name: 'action1', effect: 'toto' },
        ],
      };
      const action = new Action(config);
      expect(() => action.validateConfig()).toThrow(ActionError);
    });

    it('should not throw any error if all configurations are correct', () => {
      const config: ActionConfig = {
        width: '50px',
        actions: [
          // @ts-ignore
          {
            iconClassList: ['icon1'],
            name: 'action1',
            url: 'url1',
            blank: true,
            effect: () => {},
          },
        ],
      };
      const action = new Action(config);
      expect(() => action.validateConfig()).not.toThrow();
    });
  });
});

describe('test _getUrlParams', () => {
  const config: ActionConfig = {
    width: '50px',
    actions: [
      // @ts-ignore
      {
        iconTitle: 'icon1',
        name: 'action1',
        url: 'https://example.com/api/{resource}/{id}',
        blank: true,
        effect: () => {},
      },
    ],
  };
  const action = new Action(config);

  it('should return an empty array if no placeholders are found in the URL', () => {
    const url = 'https://example.com/api/data';
    const result = action._getUrlParams(url);
    expect(result).toEqual([]);
  });

  it('should return an array of placeholders found in the URL', () => {
    const url = 'https://example.com/api/{resource}/{id}';
    const result = action._getUrlParams(url);
    expect(result).toEqual(['resource', 'id']);
  });

  it('should return an array of unique placeholders even if duplicates are present in the URL', () => {
    const url = 'https://example.com/api/{resource}/{id}/{resource}';
    const result = action._getUrlParams(url);
    expect(result).toEqual(['resource', 'id']);
  });

  it('should return an empty array if the URL is empty', () => {
    const url = '';
    const result = action._getUrlParams(url);
    expect(result).toEqual([]);
  });

  it('should return an empty array if the URL contains only delimiters without placeholders', () => {
    const url = '{}{}';
    const result = action._getUrlParams(url);
    expect(result).toEqual([]);
  });
});

describe('parseUrlString', () => {
  const config: ActionConfig = {
    width: '50px',
    actions: [
      // @ts-ignore
      {
        iconTitle: 'icon1',
        name: 'action1',
        url: 'https://example.com/api/{resource}/{id}',
        blank: true,
        effect: () => {},
      },
    ],
  };
  const action = new Action(config);
  it('should replace placeholders in the URL with corresponding values from rowData', () => {
    const url = 'https://example.com/api/{resource}/{id}';
    const rowData = { resource: 'users', id: 123 };
    const expectedUrl = 'https://example.com/api/users/123';
    const result = action.parseUrlString(url, rowData);
    expect(result).toBe(expectedUrl);
  });

  it('should handle URLs with multiple placeholders', () => {
    const url = 'https://example.com/api/{resource}/{id}/details';
    const rowData = { resource: 'products', id: 456 };
    const expectedUrl = 'https://example.com/api/products/456/details';
    const result = action.parseUrlString(url, rowData);
    expect(result).toBe(expectedUrl);
  });

  it('should handle URLs with duplicate placeholders', () => {
    const url = 'https://example.com/api/{resource}/{resource}';
    const rowData = { resource: 'items' };
    const expectedUrl = 'https://example.com/api/items/items';
    const result = action.parseUrlString(url, rowData);
    expect(result).toBe(expectedUrl);
  });

  it('should handle URLs with missing rowData values by leaving placeholders unchanged', () => {
    const url = 'https://example.com/api/{resource}/{id}';
    const rowData = { resource: 'products' };
    const expectedUrl = 'https://example.com/api/products/{id}';
    const result = action.parseUrlString(url, rowData);
    expect(result).toBe(expectedUrl);
  });

  it('should return the original URL if rowData is empty', () => {
    const url = 'https://example.com/api/{resource}/{id}';
    const rowData = {};
    const result = action.parseUrlString(url, rowData);
    expect(result).toBe(url);
  });
});
