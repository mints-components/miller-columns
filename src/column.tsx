import InfiniteScroll from 'react-infinite-scroll-component';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

import type { DataType, IDType } from './types';
import { Checkbox, CheckboxPlaceholder } from './components';
import * as S from './styled';

interface Props {
  selectable: boolean;
  selectedIds: IDType[];
  onSelectedIds: (id: IDType) => void;
  height?: number;
  targetId: string;
  id?: IDType;
  items: DataType[];
  activeId?: IDType;
  hasMore: boolean;
  onScroll: (id?: IDType) => void;
  onExpand: (id: IDType) => void;
}

export const Column = ({
  selectable,
  selectedIds,
  onSelectedIds,
  height,
  targetId,
  id,
  items,
  activeId,
  hasMore,
  onScroll,
  onExpand,
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
        {items.map((it) => (
          <S.Item
            key={it.id}
            $actived={activeId === it.id}
            onClick={() => onExpand(it.id)}
          >
            {selectable && !it.canExpand ? (
              <Checkbox
                checked={selectedIds.includes(it.id)}
                onChange={() => onSelectedIds(it.id)}
                inputProps={{ 'aria-label': 'controlled' }}
              />
            ) : (
              <CheckboxPlaceholder />
            )}
            <S.ItemTitle>{it.title}</S.ItemTitle>
            {it.canExpand ? (
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
