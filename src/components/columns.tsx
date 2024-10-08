import { useMemo } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

import type { IDType, DataType } from '../types';
import { getId } from '../utils';
import { useTheme } from '../context';
import * as S from '../styled';

import { Checkbox } from './checkbox';

interface Props {
  bordered: boolean;
  count: number;
  height?: number;
  id?: IDType;
  items: DataType[];
  hasMore: boolean;
  error?: {
    message: string;
  };
  selectedAll: boolean;
  selectedIds: IDType[];
  renderItem: (item: DataType) => React.ReactNode;
  renderTitle?: (id?: IDType) => React.ReactNode;
  renderEnd?: (id?: IDType) => React.ReactNode;
  renderLoading?: (id?: IDType) => React.ReactNode;
  renderError?: (errMsg: string) => React.ReactNode;
  renderNoData?: (id?: IDType) => React.ReactNode;
  onScroll: (id?: IDType) => void;
  onSelectedAll: (ids: IDType[]) => void;
}

export const Column = ({
  bordered,
  count,
  height,
  id,
  items,
  hasMore,
  error,
  selectedAll,
  selectedIds,
  renderItem,
  renderTitle,
  renderEnd,
  renderError,
  renderLoading,
  renderNoData,
  onScroll,
  onSelectedAll,
}: Props) => {
  const { borderColor } = useTheme();

  const title = renderTitle?.(id) ?? null;
  const end = renderEnd?.(id) ?? null;
  const loader = renderLoading?.(id) ?? 'Loading...';
  const noData = renderNoData?.(id) ?? 'There is no data.';

  const targetId = useMemo(() => `@mints/miller-columns-${getId(id)}`, [id]);

  const [checked, indeterminate] = useMemo(() => {
    const checked = items
      .filter((item) => !item.canExpand)
      .every((item) => selectedIds.includes(item.id));
    const indeterminate =
      !checked && items.some((item) => selectedIds.includes(item.id));
    return [checked, indeterminate];
  }, [items, selectedIds]);

  if (error && error.message) {
    const message = renderError?.(error.message) ?? error.message;
    return (
      <S.Column
        $bordered={bordered}
        $borderColor={borderColor}
        $count={count}
        $height={height}
      >
        {message}
      </S.Column>
    );
  }

  if (items.length === 0 && !hasMore) {
    return (
      <S.Column
        $bordered={bordered}
        $borderColor={borderColor}
        $count={count}
        $height={height}
      >
        {noData}
      </S.Column>
    );
  }

  return (
    <S.Column
      $bordered={bordered}
      $borderColor={borderColor}
      $count={count}
      $height={height}
      id={targetId}
    >
      {title && <S.Title>{title}</S.Title>}
      {selectedAll && !hasMore && (
        <S.Item onClick={() => onSelectedAll(items.map((it) => it.id))}>
          <S.ItemInner>
            <Checkbox checked={checked} indeterminate={indeterminate} />
            <S.ItemTitle>All</S.ItemTitle>
          </S.ItemInner>
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
