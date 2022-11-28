import { useMemo } from 'react';

import type { ID, ItemType, ItemMapType, ColumnType } from '../types';

interface Props<T> {
  activeId?: ID;
  itemMap: ItemMapType<T>;
}

export const useColumns = <T>({ activeId, itemMap }: Props<T>) => {
  return useMemo(() => {
    const rootItems = Object.values(itemMap).filter(
      (it) => it.parentId === null,
    );

    const rootLeaf = {
      parentId: null,
      activeId: null,
      items: rootItems,
    };

    if (!activeId) {
      return [rootLeaf];
    }

    const activeItem = itemMap[activeId];

    const columns: ColumnType<T>[] = [
      {
        parentId: activeItem.id,
        items: activeItem.items ?? [],
        activeId: null,
      },
    ];

    const collect = (item: ItemType<T>) => {
      const parent = itemMap[item.parentId ?? ''];

      columns.unshift({
        parentId: item.parentId,
        items: parent ? parent.items ?? [] : rootItems,
        activeId: item.id ?? null,
      });

      if (parent) {
        collect(parent);
      }
    };

    collect(activeItem);

    return columns;
  }, [itemMap, activeId]);
};
