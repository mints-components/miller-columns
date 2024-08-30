import InfiniteScroll from 'react-infinite-scroll-component';

import type { IDType, DataType } from '../types';
import * as S from '../styled';

interface Props {
  height?: number;
  targetId: string;
  id?: IDType;
  items: DataType[];
  hasMore: boolean;
  renderItem: (item: DataType) => JSX.Element;
  renderTitle?: (id?: IDType) => React.ReactNode;
  renderEnd?: (id?: IDType) => React.ReactNode;
  renderLoading?: (id?: IDType) => React.ReactNode;
  onScroll: (id?: IDType) => void;
}

export const Column = ({
  height,
  targetId,
  id,
  items,
  hasMore,
  renderItem,
  renderTitle,
  renderEnd,
  renderLoading,
  onScroll,
}: Props) => {
  const title = renderTitle?.(id) ?? null;
  const end = renderEnd?.(id) ?? null;
  const loader = renderLoading?.(id) ?? 'Loading...';

  return (
    <S.Column $height={height} id={targetId}>
      {title && <S.Title>{title}</S.Title>}
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
