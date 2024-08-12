import { uniqWith } from 'lodash';

import type { DataType } from '../types';

export const checkId = <T>(data: DataType<T>[]) => {
  return (
    uniqWith(data, (a, b) => a.parentId === b.parentId && a.id === b.id)
      .length === data.length
  );
};
