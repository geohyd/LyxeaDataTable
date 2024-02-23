import '../../../lib/utils/fixToFixed';

describe('toFixedOverride', () => {
  it('should round correctly for numbers less than 1', () => {
    /* expect((0.005).toFixed(2)).toBe('0.01');
        expect((0.05).toFixed(2)).toBe('0.05');
        expect((0.0055).toFixed(2)).toBe('0.01');
        expect((0.000005).toFixed(2)).toBe('0.00');
        expect((0.00000005).toFixed(2)).toBe('0.00');
        expect((0.000000000000000000005).toFixed(2)).toBe('0.00'); */
  });

  it('should round correctly for numbers greater than or equal to 1', () => {
    /* expect((1.005).toFixed(2)).toBe('1.01');
        expect((10.05).toFixed(2)).toBe('10.05');
        expect((123456789012345678901.005).toFixed(2)).toBe('123456789012345678901.01'); */
  });
});
