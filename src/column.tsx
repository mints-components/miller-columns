import InfiniteScroll from 'react-infinite-scroll-component';

import type { ItemType } from './types';
import * as S from './styled';

interface Props {
  targetId: string;
  items: ItemType[];
  hasMore: boolean;
  onExpand: (id: string | number) => void;
}

export const Column = ({ targetId, items, hasMore, onExpand }: Props) => {
  return (
    <S.Column>
      <InfiniteScroll
        scrollableTarget={targetId}
        dataLength={items.length}
        loader={<S.Loader>Loading...</S.Loader>}
        endMessage={<S.End>The end...</S.End>}
        hasMore={hasMore}
        next={() => {}}
      >
        {items.map((it) => (
          <div onClick={() => onExpand(it.id)}>{it.title}</div>
        ))}
      </InfiniteScroll>
    </S.Column>
  );
};
