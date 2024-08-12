import InfiniteScroll from 'react-infinite-scroll-component';

import type { IMillerColumns } from './types';
import { checkId } from './utils';
import { useTransformItems, useColumns } from './hooks';

import { Container, Loader, End } from './styled';

export const MillerColumns = <T,>({ items }: IMillerColumns<T>) => {
  if (!checkId(items)) {
    throw new Error('Items must have unique id and parentId');
  }

  const transformItems = useTransformItems(items);

  const columns = useColumns(transformItems);

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
              <div>{it.title}</div>
            ))}
          </InfiniteScroll>
        );
      })}
    </Container>
  );
};
