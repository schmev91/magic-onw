import { jest, describe, it, expect, beforeEach } from '@jest/globals';
import React from 'react';
import { renderInk, settle, KEYS } from '../helpers/ink.js';

const deleteBookmark = jest.fn();
const updateLastUsed = jest.fn();

jest.unstable_mockModule('../../src/core/bookmarks.js', () => ({
  getBookmarks: () => [
    { alias: 'api', path: '/srv/api', createdAt: '', lastUsed: '' },
    { alias: 'jelly', path: '/srv/jelly', createdAt: '', lastUsed: '' },
    { alias: 'notes', path: '/home/me/notes', createdAt: '', lastUsed: '' },
  ],
  updateLastUsed,
  deleteBookmark,
}));

const { ListView } = await import('../../src/ui/views/ListView.js');

const open = async () => {
  const ui = renderInk(<ListView />);
  await settle();
  return ui;
};

const type = async (ui: { write: (s: string) => void }, text: string) => {
  for (const char of text) ui.write(char);
  await settle();
};

beforeEach(() => {
  deleteBookmark.mockClear();
  updateLastUsed.mockClear();
});

describe('search editing', () => {
  it('deletes the previous word on Alt+Backspace', async () => {
    const ui = await open();
    await type(ui, 'srv jel');
    expect(ui.lastFrame()).toContain('srv jel');

    ui.write(KEYS.altBackspace);
    await settle();

    expect(ui.lastFrame()).toContain('srv');
    expect(ui.lastFrame()).not.toContain('srv jel');
  });

  it('deletes the previous word when the terminal encodes Backspace as \\x08', async () => {
    const ui = await open();
    await type(ui, 'srv jel');

    ui.write(KEYS.altBackspaceBS);
    await settle();

    expect(ui.lastFrame()).not.toContain('srv jel');
  });

  it('deletes the previous word on Ctrl+W', async () => {
    const ui = await open();
    await type(ui, 'srv jel');

    ui.write(KEYS.ctrlW);
    await settle();

    expect(ui.lastFrame()).not.toContain('srv jel');
  });

  it('clears the query on Ctrl+U', async () => {
    const ui = await open();
    await type(ui, 'jelly');

    ui.write(KEYS.ctrlU);
    await settle();

    expect(ui.lastFrame()).toContain('Type to filter');
  });

  it('deletes one character on Backspace instead of prompting to delete a bookmark', async () => {
    const ui = await open();
    await type(ui, 'api');

    ui.write(KEYS.backspace);
    await settle();

    expect(ui.lastFrame()).not.toMatch(/Are you sure/);
    expect(deleteBookmark).not.toHaveBeenCalled();
  });

  it('types j and k into the query rather than moving the selection', async () => {
    const ui = await open();
    await type(ui, 'jel');

    expect(ui.lastFrame()).toContain('jelly');
    expect(ui.lastFrame()).not.toContain('notes');
  });
});

describe('deletion workflow', () => {
  it('prompts on Ctrl+X and deletes the highlighted bookmark on y', async () => {
    const ui = await open();
    ui.write(KEYS.ctrlX);
    await settle();
    expect(ui.lastFrame()).toMatch(/Are you sure[\s\S]*api/);

    ui.write('y');
    await settle();

    expect(deleteBookmark).toHaveBeenCalledWith('api');
  });

  it('cancels on n without deleting', async () => {
    const ui = await open();
    ui.write(KEYS.ctrlX);
    await settle();

    ui.write('n');
    await settle();

    expect(deleteBookmark).not.toHaveBeenCalled();
    expect(ui.lastFrame()).not.toMatch(/Are you sure/);
  });

  it('deletes the filtered selection, not the first bookmark overall', async () => {
    const ui = await open();
    await type(ui, 'jel');

    ui.write(KEYS.ctrlX);
    await settle();
    ui.write('y');
    await settle();

    expect(deleteBookmark).toHaveBeenCalledWith('jelly');
  });
});

describe('navigation', () => {
  it('moves the selection with arrow keys', async () => {
    const ui = await open();
    ui.write(KEYS.down);
    await settle();

    ui.write(KEYS.ctrlX);
    await settle();

    expect(ui.lastFrame()).toMatch(/Are you sure[\s\S]*jelly/);
  });

  it('does not move above the first row', async () => {
    const ui = await open();
    ui.write(KEYS.up);
    ui.write(KEYS.up);
    await settle();

    ui.write(KEYS.ctrlX);
    await settle();

    expect(ui.lastFrame()).toMatch(/Are you sure[\s\S]*api/);
  });
});
