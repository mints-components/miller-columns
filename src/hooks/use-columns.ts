import { useState, useMemo } from 'react';

import type {
  DataMapType,
  IDType,
  ColumnType,
  DataMapValueType,
} from '../types';
import { getId } from '../utils';

export const useColumns = (state: DataMapType) => {
  const [activeId, setActiveId] = useState<IDType>();

  const columns = useMemo(() => {
    const rootItem = state[getId()];

    const rootColumn: ColumnType = {
      targetId: 'miller-columns-root',
      items: rootItem.items,
      hasMore: rootItem.hasMore,
    };

    if (!activeId) {
      return [rootColumn];
    }

    const activeItem = state[activeId];

    if (!activeItem) {
      return [rootColumn];
    }

    const collect = (item: DataMapValueType) => {
      let result: ColumnType[] = [];

      result.unshift({
        targetId: `miller-columns-${item.id}`,
        id: item.id,
        items: item.items,
        hasMore: item.hasMore,
      });

      if (item.parentId) {
        const parentItem = state[item.parentId];
        result.unshift(...collect(parentItem));
      } else {
        result.unshift(rootColumn);
      }

      return result;
    };

    return collect(activeItem);
  }, [state, activeId]);

  return useMemo(() => {
    return {
      columns,
      activeId,
      onExpand: setActiveId,
    };
  }, [columns, activeId]);
};
