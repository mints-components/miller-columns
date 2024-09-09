import { DataType, DataMapType } from '../types';

export const data2Map = (
  data: DataType[],
  initialDataMap: DataMapType,
): DataMapType => {
  return data.reduce((acc, item) => {
    acc[item.id] = {
      parentId: item.parentId,
      id: item.id,
      items: data.filter((it) => it.parentId === item.id),
      canExpand: item.canExpand ?? false,
      expanded: false,
      hasMore: true,
    };
    return acc;
  }, initialDataMap);
};
