import { useReducer, useEffect } from 'react';

import { reducer } from './reducer';
import type { IDType, RequestResType, DataMapType } from './types';
import { getId, data2Map } from './utils';
import { useColumns } from './hooks';
import { Column } from './column';
import * as S from './styled';

export interface IMillerColumns {
  request: (id?: IDType, params?: any) => Promise<RequestResType>;
  rootId?: number | string;
  columnHeight?: number;
}

export const MillerColumns = ({
  request,
  rootId,
  columnHeight,
}: IMillerColumns) => {
  const [state, dispatch] = useReducer(reducer, {
    [`${getId(rootId)}`]: {
      parentId: null,
      id: getId(rootId),
      items: [],
      canExpand: false,
      hasMore: true,
      params: {},
    },
  } as DataMapType);

  const { columns, activeId, onExpand } = useColumns(state);

  useEffect(() => {
    (async () => {
      const { data, hasMore, params } = await request(rootId);
      dispatch({
        type: 'ADD',
        payload: data2Map(data, {
          parentId: null,
          id: getId(rootId),
          items: data.filter((it) => !it.parentId),
          canExpand: false,
          hasMore,
          params,
        }),
      });
    })();
  }, [request, rootId]);

  const handleScroll = async (id?: IDType) => {
    const item = state[getId(id)];

    const { data, hasMore, params } = await request(id, item.params);
    dispatch({
      type: 'ADD',
      payload: data2Map(data, {
        parentId: item.parentId,
        id: item.id,
        items: [...item.items, ...data],
        canExpand: item.canExpand,
        hasMore,
        params,
      }),
    });
  };

  const handleExpand = async (id: IDType) => {
    const item = state[id];
    if (!item.canExpand) {
      return;
    }

    onExpand(id);

    const { data, hasMore, params } = await request(id, item.params);

    dispatch({
      type: 'ADD',
      payload: data2Map(data, {
        parentId: item.parentId,
        id,
        items: [...item.items, ...data],
        canExpand: false,
        hasMore,
        params,
      }),
    });
  };

  return (
    <S.Container>
      {columns.map(({ targetId, items, hasMore }) => (
        <Column
          key={targetId}
          height={columnHeight}
          targetId={targetId}
          items={items}
          activeId={activeId}
          hasMore={hasMore}
          onScroll={handleScroll}
          onExpand={handleExpand}
        />
      ))}
    </S.Container>
  );
};
