import { uniqWith } from 'lodash';

import type { IMillerColumns } from '../types';

export const checkId = <T>(items: IMillerColumns<T>['items']) => {
  return (
    uniqWith(items, (a, b) => a.parentId === b.parentId && a.id === b.id)
      .length === items.length
  );
};
