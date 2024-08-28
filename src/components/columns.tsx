import InfiniteScroll from 'react-infinite-scroll-component';

import type { DataType, IDType } from '../types';
import * as S from '../styled';

interface Props {
  height?: number;
  targetId: string;
  id?: IDType;
  items: DataType[];
  hasMore: boolean;
  renderItem: (item: DataType) => JSX.Element;
  onScroll: (id?: IDType) => void;
}

export const Column = ({
  height,
  targetId,
  id,
  items,
  hasMore,
  renderItem,
  onScroll,
}: Props) => {
  return (
    <S.Column $height={height} id={targetId}>
      <InfiniteScroll
        scrollableTarget={targetId}
        dataLength={items.length}
        loader={<S.Loader>Loading...</S.Loader>}
        endMessage={<S.End>The end...</S.End>}
        hasMore={hasMore}
        next={() => onScroll(id)}
      >
        {items.map((item) => renderItem(item))}
      </InfiniteScroll>
    </S.Column>
  );
};
