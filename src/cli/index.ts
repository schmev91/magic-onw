import meow from 'meow';

export const cli = meow(`
  Usage
    $ onw [alias] [options]

  Options
    --here, -h      Bookmark the current directory with the given alias
    --path, -p      Specify the path to bookmark
    --alias, -a     Specify the alias to use
    --recent, -r    Sort list by recency
    --help          Show this help message
    --version       Show version

  Examples
    $ onw projects --here
    $ onw -p /tmp/test -a test
    $ onw
`, {
  importMeta: import.meta,
  flags: {
    here: {
      type: 'boolean',
      shortFlag: 'h'
    },
    path: {
      type: 'string',
      shortFlag: 'p'
    },
    alias: {
      type: 'string',
      shortFlag: 'a'
    },
    recent: {
      type: 'boolean',
      shortFlag: 'r'
    }
  }
});
