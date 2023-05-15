import { useMemo } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

import type { ID, ItemType, ColumnType } from '../../hooks';

import * as S from './styled';

interface Props<T> {
  count: number;
  column: ColumnType<T>;
  height?: number;
  showSelectAll: boolean;
  renderItem: (item: ItemType<T>) => React.ReactNode;
  renderItemAll: () => React.ReactNode;
  renderTitle?: (column: ColumnType<T>) => React.ReactNode;
  renderEnd?: (column: ColumnType<T>) => React.ReactNode;
  renderLoading?: (column: ColumnType<T>) => React.ReactNode;
  renderError?: (column: ColumnType<T>) => React.ReactNode;
  onScroll?: (id: ID | null) => void;
  onRetry?: (id: ID | null) => void;
}

export const Column = <T,>({
  count,
  column,
  height,
  showSelectAll,
  renderItem,
  renderItemAll,
  renderTitle,
  renderLoading,
  renderError,
  renderEnd,
  onScroll,
  onRetry,
}: Props<T>) => {
  const { parentId, items, hasMore, hasError } = column;

  const handleNext = () => onScroll?.(column.parentId);

  const targetId = useMemo(
    () => `miller-columns-column-${parentId ?? 'root'}`,
    [parentId],
  );

  const title = renderTitle?.(column) ?? null;
  const end =
    items.length === 0 ? renderEnd?.(column) ?? 'No data to select' : null;
  const loader = renderLoading?.(column) ?? 'Loading...';
  const error = renderError?.(column) ?? 'Retry';

  return (
    <S.Container id={targetId} count={count} height={height}>
      {title}
      {!parentId && showSelectAll && items.length ? renderItemAll() : null}
      {hasError ? (
        <S.Error onClick={() => onRetry?.(column.parentId)}>{error}</S.Error>
      ) : (
        <InfiniteScroll
          dataLength={items.length}
          hasMore={hasMore}
          next={handleNext}
          loader={<S.Loader>{loader}</S.Loader>}
          endMessage={end}
          scrollableTarget={targetId}
        >
          {items.map((it) => renderItem(it))}
        </InfiniteScroll>
      )}
    </S.Container>
  );
};
