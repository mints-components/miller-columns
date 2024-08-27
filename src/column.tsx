import InfiniteScroll from 'react-infinite-scroll-component';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

import type { ItemType } from './types';
import * as S from './styled';

interface Props {
  targetId: string;
  items: ItemType[];
  activeId: string | number | null;
  hasMore: boolean;
  onExpand: (id: string | number) => void;
}

export const Column = ({
  targetId,
  items,
  activeId,
  hasMore,
  onExpand,
}: Props) => {
  const handleExpand = (item: ItemType) => {
    if (!item.children || !item.children.length) {
      return;
    }
    onExpand(item.id);
  };

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
          <S.Item
            $actived={activeId === it.id}
            onClick={() => handleExpand(it)}
          >
            <S.ItemTitle>{it.title}</S.ItemTitle>
            {it.children && it.children.length ? (
              <ArrowForwardIosIcon
                sx={{
                  fontSize: 16,
                }}
              />
            ) : null}
          </S.Item>
        ))}
      </InfiniteScroll>
    </S.Column>
  );
};
