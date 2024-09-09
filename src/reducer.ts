import type { DataMapType, RequestResType, IDType } from './types';
import { data2Map, getId } from './utils';

type StateType = {
  dataMap: DataMapType;
  dataFlatList: any[];
};

export const initialState: StateType = {
  dataMap: {
    [`${getId()}`]: {
      parentId: null,
      id: getId(),
      items: [],
      canExpand: false,
      expanded: false,
      hasMore: true,
    },
  },
  dataFlatList: [],
};

export function reducer(
  state: StateType,
  action: {
    type: string;
    payload?: RequestResType & { id?: IDType };
  },
) {
  const { type, payload } = action;
  const { id, data, hasMore, error, params, originData } = payload ?? {
    data: [],
    hasMore: true,
  };
  const item = state.dataMap[getId(id)];

  switch (type) {
    case 'RESET':
      return initialState;
    case 'INIT':
      return {
        ...state,
        dataMap: {
          ...state.dataMap,
          ...data2Map(data, {
            [`${getId()}`]: {
              parentId: null,
              id,
              items: data,
              canExpand: false,
              expanded: false,
              hasMore,
              error,
              params,
            },
          }),
        },
        dataFlatList: originData ?? [],
      };
    case 'APPEND':
      return {
        ...state,
        dataMap: {
          ...state.dataMap,
          ...data2Map(data, {
            [`${getId(id)}`]: {
              parentId: item.parentId,
              id,
              items: [...item.items, ...data],
              canExpand: item.canExpand ?? false,
              expanded: true,
              hasMore,
              error,
              params,
            },
          }),
        },
        dataFlatList: [...state.dataFlatList, ...(originData ?? [])],
      };
    default:
      return state;
  }
}
