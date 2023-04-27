import { useMemo } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

import type { ID, ItemType, ColumnType } from '../../hooks';

import * as S from './styled';

interface Props<T> {
  count: number;
  column: ColumnType<T>;
  height?: number;
  renderItem: (item: ItemType<T>) => React.ReactNode;
  renderItemAll: () => React.ReactNode;
  renderTitle?: (column: ColumnType<T>) => React.ReactNode;
  renderLoading?: (column: ColumnType<T>) => React.ReactNode;
  renderEnd?: (column: ColumnType<T>) => React.ReactNode;
  onScroll?: (id: ID | null) => void;
}

export const Column = <T,>({
  count,
  column,
  height,
  renderItem,
  renderItemAll,
  renderTitle,
  renderLoading,
  renderEnd,
  onScroll,
}: Props<T>) => {
  const { parentId, items, hasMore } = column;

  const handleNext = () => onScroll?.(column.parentId);

  const targetId = useMemo(
    () => `miller-columns-column-${parentId ?? 'root'}`,
    [parentId],
  );

  const title = renderTitle?.(column) ?? null;
  const loader = renderLoading?.(column) ?? 'Loading...';
  const end = renderEnd?.(column) ?? null;

  return (
    <S.Container id={targetId} count={count} height={height}>
      {title}
      {!parentId && items.length ? renderItemAll() : null}
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
    </S.Container>
  );
};
