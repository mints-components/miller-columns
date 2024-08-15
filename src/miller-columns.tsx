import InfiniteScroll from 'react-infinite-scroll-component';

import type { DataType } from './types';
import { checkduplicateId } from './utils';
import { useData2Items, useColumns } from './hooks';

import { Container, Loader, End } from './styled';

export interface IMillerColumns<T> {
  data: DataType<T>[];
}

export const MillerColumns = <T,>({ data }: IMillerColumns<T>) => {
  if (!checkduplicateId(data)) {
    throw new Error('Data must have unique id');
  }

  const items = useData2Items(data);

  const { columns, onExpand } = useColumns(items);

  return (
    <Container>
      {columns.map(({ targetId, items, hasMore }) => {
        return (
          <InfiniteScroll
            scrollableTarget={targetId}
            dataLength={items.length}
            loader={<Loader>Loading...</Loader>}
            endMessage={<End>The end...</End>}
            hasMore={hasMore}
            next={() => {}}
          >
            {items.map((it) => (
              <div onClick={() => onExpand(it.id)}>{it.title}</div>
            ))}
          </InfiniteScroll>
        );
      })}
    </Container>
  );
};
