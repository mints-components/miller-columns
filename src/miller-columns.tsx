import { useState, useReducer, useEffect } from 'react';

import type { IDType, RequestResType, DataMapType } from './types';
import { Column, Item } from './components';
import { useColumns } from './hooks';
import { getId, data2Map } from './utils';
import { reducer } from './reducer';
import * as S from './styled';

export interface IMillerColumns {
  request: (id?: IDType, params?: any) => Promise<RequestResType>;
  rootId?: IDType;
  columnHeight?: number;
  renderTitle?: (id?: IDType) => React.ReactNode;
  renderEnd?: (id?: IDType) => React.ReactNode;
  renderLoading?: (id?: IDType) => React.ReactNode;
  selectable?: boolean;
  mode?: 'single' | 'multiple';
  disabledIds?: IDType[];
  selectedIds?: IDType[];
  onSelectedIds?: (ids: IDType[]) => void;
}

export const MillerColumns = ({
  request,
  rootId,
  columnHeight,
  selectable = false,
  mode = 'multiple',
  disabledIds = [],
  renderTitle,
  renderEnd,
  renderLoading,
  ...props
}: IMillerColumns) => {
  const [selectedIds, setSelectedIds] = useState<IDType[]>([]);

  const [state, dispatch] = useReducer(reducer, {
    [`${getId(rootId)}`]: {
      parentId: null,
      id: getId(rootId),
      items: [],
      canExpand: true,
      expanded: true,
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
          expanded: true,
          hasMore,
          params,
        }),
      });
    })();
  }, [request, rootId]);

  useEffect(() => {
    setSelectedIds(props.selectedIds || []);
  }, [props.selectedIds]);

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
        expanded: true,
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

    if (item.expanded) {
      return;
    }

    const { data, hasMore, params } = await request(id, item.params);

    dispatch({
      type: 'ADD',
      payload: data2Map(data, {
        parentId: item.parentId,
        id,
        items: [...item.items, ...data],
        canExpand: item.canExpand,
        expanded: true,
        hasMore,
        params,
      }),
    });
  };

  const handleSelectedIds = (id: IDType) => {
    let newSelectedIds: IDType[] = [];

    if (mode === 'single') {
      newSelectedIds = [id];
    } else if (mode === 'multiple') {
      const index = selectedIds.indexOf(id);

      if (index > -1) {
        newSelectedIds = selectedIds.filter((it) => it !== id);
      } else {
        newSelectedIds = [...selectedIds, id];
      }
    }

    if (props.onSelectedIds) {
      props.onSelectedIds(newSelectedIds);
    } else {
      setSelectedIds(newSelectedIds);
    }
  };

  return (
    <S.Container>
      {columns.map(({ targetId, id, items, hasMore }) => (
        <Column
          key={targetId}
          height={columnHeight}
          targetId={targetId}
          id={id}
          items={items}
          hasMore={hasMore}
          renderTitle={renderTitle}
          renderEnd={renderEnd}
          renderLoading={renderLoading}
          renderItem={(item) => (
            <Item
              key={item.id}
              item={item}
              activeId={activeId}
              selectable={selectable}
              mode={mode}
              disabledIds={disabledIds}
              selectedIds={selectedIds}
              onSelectedIds={handleSelectedIds}
              onExpand={handleExpand}
            />
          )}
          onScroll={handleScroll}
        />
      ))}
    </S.Container>
  );
};
