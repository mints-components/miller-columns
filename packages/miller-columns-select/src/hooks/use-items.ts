import { useCallback, useMemo } from 'react';

import { MillerColumnsSelectItemType } from '../types';

import type { ID, ItemType } from './types';

interface Props<T> {
  items: MillerColumnsSelectItemType<T>[];
  getCanExpand: (item: MillerColumnsSelectItemType<T>) => boolean;
  getHasMore?: (id: ID) => boolean;
}

export const useItems = <T>({ items, getCanExpand, getHasMore }: Props<T>) => {
  const transformItems = useCallback(
    (item?: ItemType<T>): ItemType<T>[] => {
      return items
        .filter((it) => (item ? it.parentId === item.id : true))
        .map((it) => {
          const canExpand = getCanExpand(it);
          const childLoaded = canExpand ? !getHasMore?.(it.id) : true;
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
    [items, getCanExpand, getHasMore],
  );

  return useMemo(() => transformItems(), [transformItems]);
};
