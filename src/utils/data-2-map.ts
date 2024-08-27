import { DataType, DataMapValueType, DataMapType } from '../types';

export const data2Map = (
  data: DataType[],
  initialDataMap: DataMapValueType,
): DataMapType => {
  return data.reduce(
    (acc, item) => {
      acc[item.id] = {
        parentId: item.parentId,
        id: item.id,
        items: data.filter((it) => it.parentId === item.id),
        canExpand: item.canExpand,
        hasMore: true,
      };
      return acc;
    },
    {
      [`${initialDataMap.id}`]: initialDataMap,
    },
  );
};
