import { useCallback } from 'react';

import type { ItemType, ColumnType } from './types';
import { useMillerColumns, UseMillerColumnsProps } from './hooks';
import { Column, Item } from './components';
import * as S from './styled';

interface Props<T> extends UseMillerColumnsProps<T> {
  columnCount?: number;
  columnHeight?: number;
  getCanExpand?: (item: ItemType<T>) => boolean;
  getHasMore?: (column: ColumnType<T>) => boolean;
  renderTitle?: (column: ColumnType<T>) => React.ReactNode;
  renderLoading?: (column: ColumnType<T>) => React.ReactNode;
  renderEnd?: (column: ColumnType<T>) => React.ReactNode;
  onScrollColumn?: (column: ColumnType<T>) => void;
  renderHeader?: (columns: ColumnType<T>[]) => React.ReactNode;
  renderFooter?: (columns: ColumnType<T>[]) => React.ReactNode;
}

export const MillerColumnsSelect = <T,>({
  columnCount,
  columnHeight,
  getCanExpand,
  getHasMore,
  renderTitle,
  renderLoading,
  renderEnd,
  onScrollColumn,
  renderHeader,
  renderFooter,
  ...props
}: Props<T>) => {
  const {
    columns,
    getItemStatus,
    getItemCheckStatus,
    onExpandItem,
    onSelectItem,
  } = useMillerColumns<T>(props);

  const checkAllChildLoaded = useCallback(
    (item: ItemType<T>): boolean => {
      const canExpand = getCanExpand?.(item) ?? false;
      const hasMore = getHasMore?.({
        parentId: item.id,
        parentTitle: item.title,
        items: item.items ?? [],
        activeId: null,
      });

      if (canExpand && hasMore) {
        return false;
      }

      return (item.items ?? [])?.every((it) => checkAllChildLoaded(it));
    },
    [getCanExpand, getHasMore],
  );

  const header = renderHeader?.(columns) ?? null;
  const footer = renderFooter?.(columns) ?? null;

  return (
    <S.Container>
      {header && <div className="header">{header}</div>}
      <div className="main">
        {columns.map((column) => {
          if (!column.items.length) {
            return null;
          }

          const hasMore = getHasMore?.(column) ?? false;
          return (
            <Column
              key={column.parentId}
              count={columnCount ?? 3}
              column={column}
              hasMore={hasMore}
              height={columnHeight}
              renderItem={(item) => {
                const canExpand = getCanExpand?.(item) ?? false;
                const status = getItemStatus(item, column);
                const allChildLoaded = checkAllChildLoaded(item);
                const checkStatus = getItemCheckStatus(
                  item,
                  canExpand,
                  allChildLoaded,
                );
                return (
                  <Item
                    key={item.id}
                    item={item}
                    canExpand={canExpand}
                    status={status}
                    checkStatus={checkStatus}
                    onSelect={onSelectItem}
                    onExpand={onExpandItem}
                  />
                );
              }}
              renderTitle={renderTitle}
              renderLoading={renderLoading}
              renderEnd={renderEnd}
              onScroll={onScrollColumn}
            />
          );
        })}
      </div>
      {footer && <div className="footer">{footer}</div>}
    </S.Container>
  );
};
