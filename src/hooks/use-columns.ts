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
      items: rootItem.items,
      hasMore: rootItem.hasMore,
      error: rootItem.error,
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
        id: item.id,
        items: item.items,
        hasMore: item.hasMore,
        error: rootItem.error,
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
