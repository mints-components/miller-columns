import { useMemo } from 'react';

import type {
  DataMapType,
  IDType,
  ColumnType,
  DataMapValueType,
} from '../types';
import { getId } from '../utils';

export const useColumns = (dataMap: DataMapType, activeId?: IDType) => {
  return useMemo(() => {
    const rootItem = dataMap[getId()];

    const rootColumn: ColumnType = {
      items: rootItem.items,
      hasMore: rootItem.hasMore,
      error: rootItem.error,
    };

    if (!activeId) {
      return [rootColumn];
    }

    const activeItem = dataMap[activeId];

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
        const parentItem = dataMap[item.parentId];
        result.unshift(...collect(parentItem));
      } else {
        result.unshift(rootColumn);
      }

      return result;
    };

    return collect(activeItem);
  }, [dataMap, activeId]);
};
