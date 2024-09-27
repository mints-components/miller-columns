import { useState, useReducer, useEffect } from 'react';

import type { IDType, RequestResType, DataType } from './types';
import { Context, initialTheme } from './context';
import { Column, Item } from './components';
import { useColumns } from './hooks';
import { getId } from './utils';
import { reducer, initialState } from './reducer';
import * as S from './styled';

export interface IMillerColumns {
  request?: (id?: IDType, params?: any) => Promise<RequestResType>;
  rootId?: IDType;
  items?: DataType[];
  style?: React.CSSProperties;
  bordered?: boolean;
  theme?: {
    colorPrimary?: string;
    borderColor?: string;
  };
  columnCount?: number;
  columnHeight?: number;
  renderTitle?: (id?: IDType) => React.ReactNode;
  renderEnd?: (id?: IDType) => React.ReactNode;
  renderLoading?: (id?: IDType) => React.ReactNode;
  renderError?: (errMsg: string) => React.ReactNode;
  renderNoData?: (id?: IDType) => React.ReactNode;
  selectable?: boolean;
  mode?: 'single' | 'multiple';
  disabledIds?: IDType[];
  selectedIds?: IDType[];
  onSelectedIds?: (ids: IDType[], data?: any[]) => void;
}

export const MillerColumns = ({
  request,
  rootId,
  items,
  style,
  bordered = false,
  theme,
  columnCount,
  columnHeight,
  selectable = false,
  mode = 'multiple',
  disabledIds = [],
  renderTitle,
  renderEnd,
  renderLoading,
  renderError,
  renderNoData,
  ...props
}: IMillerColumns) => {
  const [activeId, setActiveId] = useState<IDType>();
  const [selectedIds, setSelectedIds] = useState<IDType[]>([]);

  const [dataMap, dispatch] = useReducer(reducer, initialState);

  const columns = useColumns(dataMap, activeId);

  useEffect(() => {
    let isMounted = true;

    (async () => {
      let payload = {
        data: items ?? [],
        hasMore: true,
      };

      if (request) {
        payload = await request?.(rootId);
      }

      if (isMounted) {
        dispatch({ type: 'RESET', payload });
      }
    })();

    return () => {
      dispatch({ type: 'INITIAL' });
      setActiveId(undefined);
      isMounted = false;
    };
  }, [rootId, items]);

  useEffect(() => {
    setSelectedIds(props.selectedIds || []);
  }, [props.selectedIds]);

  const handleScroll = async (id?: IDType) => {
    if (request) {
      const item = dataMap[getId(id)];
      const payload = await request(id, item.params);
      dispatch({ type: 'APPEND', payload: { ...payload, id } });
    }
  };

  const handleExpand = async (id: IDType) => {
    const item = dataMap[id];

    if (!item.canExpand) {
      return;
    }

    setActiveId(id);

    if (!item.expanded && request) {
      const payload = await request(id, item.params);
      dispatch({ type: 'APPEND', payload: { ...payload, id } });
    }
  };

  const handleSelectedIds = (id: IDType) => {
    const item = dataMap[id];

    if (item.canExpand) {
      return;
    }

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
      const selectedItems = newSelectedIds.map((it) => dataMap[it].original);
      props.onSelectedIds(newSelectedIds, selectedItems);
    } else {
      setSelectedIds(newSelectedIds);
    }
  };

  const handleSelectedAll = (ids: IDType[]) => {
    const newSelectedIds = selectedIds.length === ids.length ? [] : ids;
    if (props.onSelectedIds) {
      const selectedItems = newSelectedIds.map((it) => dataMap[it].original);
      props.onSelectedIds(newSelectedIds, selectedItems);
    } else {
      setSelectedIds(newSelectedIds);
    }
  };

  return (
    <Context.Provider value={{ theme: { ...initialTheme, ...(theme ?? {}) } }}>
      <S.Container style={style}>
        {columns.map(({ id, items, hasMore, error }) => (
          <Column
            key={getId(id)}
            bordered={bordered}
            count={columnCount ?? columns.length}
            height={columnHeight}
            id={id}
            items={items}
            hasMore={hasMore}
            error={error}
            selectedAll={
              selectable &&
              columns.length === 1 &&
              !!items.length &&
              !items.some((it) => it.canExpand)
            }
            selectedIds={selectedIds}
            renderTitle={renderTitle}
            renderEnd={renderEnd}
            renderLoading={renderLoading}
            renderError={renderError}
            renderNoData={renderNoData}
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
            onSelectedAll={handleSelectedAll}
          />
        ))}
      </S.Container>
    </Context.Provider>
  );
};
