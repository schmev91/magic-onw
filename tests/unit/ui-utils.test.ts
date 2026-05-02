import { truncatePath } from '../../src/core/ui-utils.js';

describe('truncatePath', () => {
  it('should not truncate path shorter than maxLength', () => {
    const path = '/home/user/short';
    expect(truncatePath(path, 20)).toBe(path);
  });

  it('should not truncate path exactly at maxLength', () => {
    const path = '/home/user/exact-20'; // 20 chars
    expect(truncatePath(path, 20)).toBe(path);
  });

  it('should truncate path longer than maxLength and add ellipsis', () => {
    const path = '/home/user/some/very/long/path/that/needs/truncation';
    const maxLength = 20;
    const result = truncatePath(path, maxLength);
    expect(result.length).toBe(maxLength);
    expect(result.endsWith('...')).toBe(true);
    expect(result).toBe('/home/user/some/v...');
  });
});
