import MillerColumnsSelect, {
  MillerColumnsSelectProps,
} from 'miller-columns-select';

import type { ExtraItemType } from '../types';
import { TypeEnum } from '../types';

import { useTest } from './use-test';

export const AsyncMillerColumnsSelect = (
  props: Omit<
    MillerColumnsSelectProps<ExtraItemType>,
    'items' | 'getCanExpand' | 'getHasMore' | 'onExpand' | 'onScroll'
  >,
) => {
  const { items, getHasMore, onExpand, onScroll } = useTest();

  return (
    <MillerColumnsSelect
      {...props}
      items={items}
      getCanExpand={(item) => item.type === TypeEnum.folder}
      getHasMore={getHasMore}
      onExpand={onExpand}
      onScroll={onScroll}
    />
  );
};
