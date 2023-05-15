import { useState, useMemo } from 'react';

import type { ID, ItemType, ColumnType, ColumnMapType } from './types';

interface Props<T> {
  items: ItemType<T>[];
  getHasMore?: (id: ID | null) => boolean;
  onExpand?: (id: ID) => void;
}

export const useColumns = <T>({ items, getHasMore, onExpand }: Props<T>) => {
  const [activeId, setActiveId] = useState<ID>();
  const [expandedIds, setExpandedIds] = useState<ID[]>([]);

  const columnMap = useMemo(
    () =>
      items
        .filter((it) => it.canExpand)
        .reduce((acc, cur) => {
          acc[cur.id] = cur;
          return acc;
        }, {} as ColumnMapType<T>),
    [items],
  );

  const columns = useMemo(() => {
    const rootItems = items.filter((it) => it.parentId === null);

    const rootLeaf: ColumnType<T> = {
      parentId: null,
      parentTitle: null,
      activeId: null,
      items: rootItems,
      hasMore: getHasMore?.(null) ?? false,
    };

    if (!activeId) {
      return [rootLeaf];
    }

    const activeColumn = columnMap[activeId];

    const columns: ColumnType<T>[] = [
      {
        parentId: activeColumn.id,
        parentTitle: activeColumn.title,
        items: activeColumn.items ?? [],
        activeId: null,
        hasMore: getHasMore?.(activeId) ?? false,
      },
    ];

    const collect = (item: ItemType<T>) => {
      const parent = columnMap[item.parentId ?? ''];

      columns.unshift({
        parentId: parent ? parent.id : null,
        parentTitle: parent ? parent.title : null,
        items: parent ? parent.items ?? [] : rootItems,
        activeId: item.id ?? null,
        hasMore: getHasMore?.(parent ? parent.id : null) ?? false,
      });

      if (parent) {
        collect(parent);
      }
    };

    collect(activeColumn);

    return columns;
  }, [items, activeId, columnMap, getHasMore]);

  return useMemo(
    () => ({
      columns,
      onExpandItem(item: ItemType<T>) {
        setActiveId(item.id);

        if (!expandedIds.includes(item.id)) {
          onExpand?.(item.id);
          setExpandedIds([...expandedIds, item.id]);
        }
      },
    }),
    [columns, expandedIds, onExpand],
  );
};
