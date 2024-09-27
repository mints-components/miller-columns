import type { DataMapType, RequestResType, IDType } from './types';
import { data2Map, getId } from './utils';

export const initialState: DataMapType = {
  [getId()]: {
    parentId: null,
    id: getId(),
    items: [],
    canExpand: false,
    expanded: false,
    hasMore: true,
  },
};

export function reducer(
  state: DataMapType,
  action: {
    type: string;
    payload?: RequestResType & { id?: IDType };
  },
) {
  const { type, payload } = action;
  const { data, hasMore, error, params } = payload ?? {
    data: [],
    hasMore: true,
  };

  const id = getId(payload?.id);

  switch (type) {
    case 'RESET':
      return {
        ...state,
        ...data2Map(data, {
          [id]: {
            ...state[id],
            items: data,
            hasMore,
            error,
            params,
          },
        }),
      };
    case 'APPEND':
      return {
        ...state,
        ...data2Map(data, {
          [id]: {
            ...state[id],
            items: [...state[id].items, ...data],
            hasMore,
            error,
            params,
          },
        }),
      };
    default:
      return state;
  }
}
