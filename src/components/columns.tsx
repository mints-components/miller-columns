import { useMemo } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

import type { IDType, DataType } from '../types';
import * as S from '../styled';

import { Checkbox } from './checkbox';

interface Props {
  height?: number;
  targetId: string;
  id?: IDType;
  items: DataType[];
  hasMore: boolean;
  selectedAll: boolean;
  selectedIds: IDType[];
  renderItem: (item: DataType) => React.ReactNode;
  renderTitle?: (id?: IDType) => React.ReactNode;
  renderEnd?: (id?: IDType) => React.ReactNode;
  renderLoading?: (id?: IDType) => React.ReactNode;
  onScroll: (id?: IDType) => void;
  onSelectedAll: (ids: IDType[]) => void;
}

export const Column = ({
  height,
  targetId,
  id,
  items,
  hasMore,
  selectedAll,
  selectedIds,
  renderItem,
  renderTitle,
  renderEnd,
  renderLoading,
  onScroll,
  onSelectedAll,
}: Props) => {
  const title = renderTitle?.(id) ?? null;
  const end = renderEnd?.(id) ?? null;
  const loader = renderLoading?.(id) ?? 'Loading...';

  const [checked, indeterminate] = useMemo(() => {
    const checked = items
      .filter((item) => !item.canExpand)
      .every((item) => selectedIds.includes(item.id));
    const indeterminate =
      !checked && items.some((item) => selectedIds.includes(item.id));
    return [checked, indeterminate];
  }, [items, selectedIds]);

  return (
    <S.Column $height={height} id={targetId}>
      {title && <S.Title>{title}</S.Title>}
      {selectedAll && !hasMore && (
        <S.Item>
          <Checkbox
            checked={checked}
            indeterminate={indeterminate}
            onChange={() => onSelectedAll(items.map((it) => it.id))}
          />
          <S.ItemTitle>All</S.ItemTitle>
        </S.Item>
      )}
      <InfiniteScroll
        scrollableTarget={targetId}
        dataLength={items.length}
        loader={<S.Loader>{loader}</S.Loader>}
        endMessage={<S.End>{end}</S.End>}
        hasMore={hasMore}
        next={() => onScroll(id)}
      >
        {items.map((item) => renderItem(item))}
      </InfiniteScroll>
    </S.Column>
  );
};
