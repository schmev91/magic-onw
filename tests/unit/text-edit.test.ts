import { describe, it, expect } from '@jest/globals';
import { deleteCharBefore, deleteWordBefore, printableInput } from '../../src/core/text-edit.js';

describe('deleteCharBefore', () => {
  it('removes the last character', () => {
    expect(deleteCharBefore('api')).toBe('ap');
  });

  it('is a no-op on an empty string', () => {
    expect(deleteCharBefore('')).toBe('');
  });
});

describe('deleteWordBefore', () => {
  it('removes the trailing word', () => {
    expect(deleteWordBefore('srv jelly')).toBe('srv ');
  });

  it('removes trailing whitespace and the word before it in one press', () => {
    expect(deleteWordBefore('srv jelly   ')).toBe('srv ');
  });

  it('clears a single word', () => {
    expect(deleteWordBefore('jelly')).toBe('');
  });

  it('clears whitespace-only input', () => {
    expect(deleteWordBefore('   ')).toBe('');
  });

  it('is a no-op on an empty string', () => {
    expect(deleteWordBefore('')).toBe('');
  });

  it('treats path separators as part of the word', () => {
    // Paths are searchable, so /srv/jelly must not need four presses to clear.
    expect(deleteWordBefore('home /srv/jelly')).toBe('home ');
  });
});

describe('printableInput', () => {
  it('passes through plain characters', () => {
    expect(printableInput('a', {})).toBe('a');
  });

  it('drops the raw letter ink reports for a Ctrl combo', () => {
    // Ctrl+W arrives as "w" with key.ctrl set; typing it would corrupt the query.
    expect(printableInput('w', { ctrl: true })).toBe('');
  });

  it('drops Alt combos', () => {
    expect(printableInput('b', { meta: true })).toBe('');
  });

  it('drops Enter, Escape and Tab', () => {
    expect(printableInput('\r', { return: true })).toBe('');
    expect(printableInput('\x1b', { escape: true })).toBe('');
    expect(printableInput('\t', { tab: true })).toBe('');
  });

  it('keeps a multi-character paste but strips control characters from it', () => {
    expect(printableInput('sr\x07v', {})).toBe('srv');
  });

  it('keeps non-ASCII characters', () => {
    expect(printableInput('éclair', {})).toBe('éclair');
  });
});
