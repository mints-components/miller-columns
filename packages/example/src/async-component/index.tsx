import MillerColumnsSelect, {
  MillerColumnsSelectProps,
} from 'miller-columns-select';

import type { ExtraItemType } from '../types';

import { useTest } from './use-test';

export const AsyncMillerColumnsSelect = (
  props: Omit<
    MillerColumnsSelectProps<ExtraItemType>,
    'items' | 'onExpandItem'
  >,
) => {
  const { items, getHasMore, onExpandItem, onScrollColumn } = useTest();

  return (
    <MillerColumnsSelect
      {...props}
      getHasMore={getHasMore}
      items={items}
      onExpandItem={onExpandItem}
      onScrollColumn={onScrollColumn}
    />
  );
};
