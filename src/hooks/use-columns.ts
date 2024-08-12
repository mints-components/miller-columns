import { useMemo } from 'react';

import type { ItemType } from '../types';

export const useColumns = <T>(items: ItemType<T>[]) => {
  return useMemo(
    () => [
      {
        targetId: 'miller-columns-root',
        items: items.filter((it) => !it.parentId),
        hasMore: false,
      },
    ],
    [items],
  );
};
