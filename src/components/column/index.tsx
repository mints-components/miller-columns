import { useMemo } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

import type { ItemType, ColumnType } from '../../types';

import * as S from './styled';

interface Props<T> {
  count: number;
  column: ColumnType<T>;
  hasMore: boolean;
  height?: number;
  renderItem: (item: ItemType<T>) => React.ReactNode;
  renderTitle?: (column: ColumnType<T>) => React.ReactNode;
  renderLoading?: (column: ColumnType<T>) => React.ReactNode;
  renderEnd?: (column: ColumnType<T>) => React.ReactNode;
  onScroll?: (column: ColumnType<T>) => void;
}

export const Column = <T,>({
  count,
  column,
  hasMore,
  height,
  renderItem,
  renderTitle,
  renderLoading,
  renderEnd,
  onScroll,
}: Props<T>) => {
  const { parentId, items } = column;

  const handleNext = () => onScroll?.(column);

  const targetId = useMemo(
    () => `miller-columns-column-${parentId ?? 'root'}`,
    [parentId],
  );

  const title = renderTitle?.(column) ?? null;
  const loading = renderLoading?.(column) ?? <span>Loading...</span>;
  const end = renderEnd?.(column) ?? null;

  return (
    <S.Container id={targetId} count={count} height={height}>
      {title && <div className="title">{title}</div>}
      <InfiniteScroll
        dataLength={items.length}
        hasMore={hasMore}
        next={handleNext}
        loader={loading}
        endMessage={end}
        scrollableTarget={targetId}
      >
        {items.map((it) => renderItem(it))}
      </InfiniteScroll>
    </S.Container>
  );
};
