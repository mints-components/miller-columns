import { useState, useMemo } from 'react';

import type { ItemType } from '../types';

export const useColumns = (items: ItemType[]) => {
  const [activeId, setActiveId] = useState<string | number | null>(null);

  const columns = useMemo(() => {
    const rootColumn = {
      targetId: 'miller-columns-root',
      items: items.filter((it) => !it.parentId),
      hasMore: false,
    };

    if (!activeId) {
      return [rootColumn];
    }

    const activeItem = items.find((it) => it.id === activeId);

    if (!activeItem) {
      return [rootColumn];
    }

    const collect = (item: ItemType) => {
      let result: {
        targetId: string;
        items: ItemType[];
        hasMore: boolean;
      }[] = [];

      result.unshift({
        targetId: `miller-columns-${item.id}`,
        items: items.filter((it) => it.parentId === item.id),
        hasMore: false,
      });

      const parentItem = items.find((it) => it.id === item.parentId);

      if (parentItem) {
        result.unshift(...collect(parentItem));
      } else {
        result.unshift(rootColumn);
      }

      return result;
    };

    return collect(activeItem);
  }, [items, activeId]);

  return useMemo(() => {
    return {
      columns,
      activeId,
      onExpand: setActiveId,
    };
  }, [columns, activeId]);
};
