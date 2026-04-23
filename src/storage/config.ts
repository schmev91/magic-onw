import Conf from 'conf';
import { Config } from '../core/types.js';

const schema = {
  entries: {
    type: 'array',
    items: {
      type: 'object',
      properties: {
        alias: { type: 'string' },
        path: { type: 'string' },
        createdAt: { type: 'string' },
        lastUsed: { type: 'string' }
      },
      required: ['alias', 'path', 'createdAt', 'lastUsed']
    },
    default: []
  },
  sortOrder: {
    type: 'string',
    enum: ['asc', 'desc'],
    default: 'desc'
  }
} as const;

export const config = new Conf<Config>({
  projectName: 'onw',
  schema,
  projectSuffix: ''
});
