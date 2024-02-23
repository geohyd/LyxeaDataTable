/**
 * @jest-environment jsdom
 */

import AbstractLxDom from '../../../lib/dom/AbstractLxDom';

describe('AbstractLxDom', () => {
  let abstractLxDom: AbstractLxDom;

  beforeEach(() => {
    abstractLxDom = new AbstractLxDom();
  });

  describe('$element', () => {
    test('creates a custom element with class list', () => {
      const element = abstractLxDom.$element('div', {
        classList: ['custom-class', 'another-class'],
      });

      expect(element.classList.contains('custom-class')).toBe(true);
      expect(element.classList.contains('another-class')).toBe(true);
    });

    test('creates a custom element with attributes', () => {
      const element = abstractLxDom.$element('input', {
        attributes: { type: 'checkbox', checked: true, 'data-test': 'test' },
      });

      expect(element.getAttribute('type')).toBe('checkbox');
      expect(element.getAttribute('checked')).toBe('');
      expect(element.getAttribute('data-test')).toBe('test');
    });

    test('creates a custom element with content', () => {
      const element = abstractLxDom.$element('p', {
        content: 'This is a paragraph.',
      });

      expect(element.textContent).toBe('This is a paragraph.');
    });

    test('creates a custom element with children', () => {
      const child1 = document.createElement('span');
      const child2 = document.createElement('span');
      const element = abstractLxDom.$element('div', {
        children: [child1, child2],
      });

      expect(element.children.length).toBe(2);
      expect(element.children[0]).toBe(child1);
      expect(element.children[1]).toBe(child2);
    });

    test('creates a custom element with inner HTML', () => {
      const element = abstractLxDom.$element('div', {
        html: '<p>This is inner HTML.</p>',
      });

      expect(element.innerHTML).toBe('<p>This is inner HTML.</p>');
    });

    test('creates a custom element with style', () => {
      const element = abstractLxDom.$element('div', {
        style: { color: 'red', fontSize: '16px' },
      });

      expect(element.style.color).toBe('red');
      expect(element.style.fontSize).toBe('16px');
    });

    test('creates a custom element with mixed properties', () => {
      const child = document.createElement('span');
      const element = abstractLxDom.$element('div', {
        classList: ['custom-class'],
        attributes: { id: 'test-id', disabled: true },
        content: 'Test content',
        children: [child],
        style: { color: 'red', fontSize: '16px' },
      });

      expect(element.tagName).toBe('DIV');
      expect(element.classList.contains('custom-class')).toBe(true);
      expect(element.getAttribute('id')).toBe('test-id');
      expect(element.getAttribute('disabled')).toBe('');
      expect(element.textContent).toBe('Test content');
      expect(element.children.length).toBe(1);
      expect(element.children[0]).toBe(child);
      expect(element.style.color).toBe('red');
      expect(element.style.fontSize).toBe('16px');
    });
  });
});
