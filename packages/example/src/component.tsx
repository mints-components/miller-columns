import { useState, useEffect, useCallback } from 'react';
import MillerColumnsSelect, {
  McsID,
  McsItem,
  MillerColumnsSelectProps,
} from 'miller-columns-select';

import type { ExtraItemType } from './types';
import { TypeEnum } from './types';
import { getItems } from './mock';

export const MockComponent = (
  props: Omit<
    MillerColumnsSelectProps<ExtraItemType>,
    'items' | 'getCanExpand' | 'getHasMore' | 'onExpand' | 'onScroll'
  >,
) => {
  const [items, setItems] = useState<McsItem<ExtraItemType>[]>([]);
  // Record whether the column has been loaded
  const [loadedIds, setLoadedIds] = useState<McsID[]>([]);

  // Get the initial items data
  // And know whether the first column has completed all data loaded
  const getRootItems = async () => {
    const { data, hasMore } = await getItems();
    setItems(data);
    if (!hasMore) {
      setLoadedIds(['root']);
    }
  };

  useEffect(() => {
    getRootItems();
  }, []);

  // Load more data when expanding
  // And judge whether the item is expanded
  const onExpand = useCallback(
    async (id: McsID) => {
      const { data, hasMore } = await getItems(1, id);
      setItems([...items, ...data]);
      if (!hasMore) {
        setLoadedIds([...loadedIds, id]);
      }
    },
    [items, loadedIds],
  );

  // Scroll to load data and set it after loading
  const onScroll = async (id: McsID | null) => {
    const { data, hasMore } = await getItems(2, id);
    setItems([...items, ...data]);
    if (!hasMore) {
      setLoadedIds([...loadedIds, id ?? 'root']);
    }
  };

  return (
    <MillerColumnsSelect
      {...props}
      items={items}
      getCanExpand={(item) => item.type === TypeEnum.folder}
      getHasMore={(id) => !loadedIds.includes(id ?? 'root')}
      onExpand={onExpand}
      onScroll={onScroll}
    />
  );
};
