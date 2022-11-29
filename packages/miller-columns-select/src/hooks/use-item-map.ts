import { useState, useEffect, useCallback, useMemo } from 'react';

import { ItemType, ItemMapType } from '../types';

interface Props<T> {
  items: ItemType<T>[];
}

export const useItemMap = <T>({ items }: Props<T>) => {
  const [itemMap, setItemMap] = useState<ItemMapType<T>>({});

  const checkItemsDuplicate = useCallback(() => {
    const duplicate = new Set(items.map((it) => it.id)).size !== items.length;
    if (duplicate) {
      throw new Error('miller-columns-select: Duplicate ID in items');
    }
  }, [items]);

  const collectChildItems = useCallback(
    (items: ItemType<T>[], item: ItemType<T>): ItemType<T>[] => {
      return items
        .filter((it) => {
          return it.parentId === item.id;
        })
        .map((it) => ({
          ...it,
          items: collectChildItems(items, it),
        }));
    },
    [],
  );

  const itemsToMap = useCallback(() => {
    return items.reduce((acc, cur) => {
      acc[cur.id] = {
        ...cur,
        items: collectChildItems(items, cur),
      };
      return acc;
    }, {} as ItemMapType<T>);
  }, [items, collectChildItems]);

  useEffect(() => {
    checkItemsDuplicate();
    setItemMap(itemsToMap());
  }, [checkItemsDuplicate, itemsToMap]);

  return useMemo(() => itemMap, [itemMap]);
};
