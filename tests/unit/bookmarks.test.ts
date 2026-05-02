import { deleteBookmark, getBookmarks, addBookmark } from '../../src/core/bookmarks.js';
import { config } from '../../src/storage/config.js';

describe('bookmarks core', () => {
  beforeEach(() => {
    config.set('entries', []);
  });

  test('deleteBookmark removes an entry', () => {
    addBookmark('test', '/tmp');
    expect(getBookmarks().length).toBe(1);
    
    deleteBookmark('test');
    expect(getBookmarks().length).toBe(0);
  });

  test('deleteBookmark does nothing if alias not found', () => {
    addBookmark('test', '/tmp');
    deleteBookmark('other');
    expect(getBookmarks().length).toBe(1);
  });
});
