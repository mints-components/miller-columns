import { useCallback, useMemo } from 'react';

import { McsItem } from '../types';

import type { ID, ItemType } from './types';

interface Props<T> {
  items: McsItem<T>[];
  getCanExpand?: (item: McsItem<T>) => boolean;
  getHasMore?: (id: ID) => boolean;
}

export const useItems = <T>({ items, getCanExpand, getHasMore }: Props<T>) => {
  const checkChildLoaded = useCallback(
    (item: McsItem<T>): boolean => {
      const canExpand = getCanExpand?.(item) ?? false;
      const hasMore = getHasMore?.(item.id);

      if (canExpand && hasMore) {
        return false;
      }

      const childItems = items.filter((it) => it.parentId === item.id);

      return childItems?.every((it) => checkChildLoaded(it));
    },
    [items, getCanExpand, getHasMore],
  );

  const transformItems = useCallback(
    (item?: ItemType<T>): ItemType<T>[] => {
      return items
        .filter((it) => (item ? it.parentId === item.id : true))
        .map((it) => {
          const canExpand = getCanExpand?.(it) ?? false;
          const childLoaded = checkChildLoaded(it);
          const childItems = canExpand
            ? transformItems({
                ...it,
                items: [],
                canExpand,
                childLoaded,
              })
            : [];

          return {
            ...it,
            items: childItems,
            canExpand,
            childLoaded,
          };
        });
    },
    [items, getCanExpand, checkChildLoaded],
  );

  return useMemo(() => transformItems(), [transformItems]);
};
