/*
 * Licensed to the Apache Software Foundation (ASF) under one or more
 * contributor license agreements.  See the NOTICE file distributed with
 * this work for additional information regarding copyright ownership.
 * The ASF licenses this file to You under the Apache License, Version 2.0
 * (the "License"); you may not use this file except in compliance with
 * the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */

import { useState, useEffect, useCallback, useMemo } from 'react';
import type { ID, ItemType, ColumnType } from 'miller-columns-select';

import type { ExtraItemType } from '../types';

import { mockFirst, mockSecond, mockThird } from './mock';

export const useTest = () => {
  const [items, setItems] = useState<ItemType<ExtraItemType>[]>([]);
  // Record whether the item has been expanded and whether the column has been loaded
  const [expandedIds, setExpandedIds] = useState<ID[]>([]);
  const [loadedIds, setLoadedIds] = useState<ID[]>([]);

  // Get the initial items data
  // And know whether the first column has completed all data loaded
  useEffect(() => {
    (async () => {
      const res = await new Promise((r) =>
        setTimeout(() => r(mockFirst), 2000),
      );
      setItems(res as ItemType<ExtraItemType>[]);
      setLoadedIds(['root']);
    })();
  }, []);

  // Load more data when expanding
  // And judge whether the item is expanded
  const onExpandItem = useCallback(
    async (item: ItemType<ExtraItemType>) => {
      if (expandedIds.includes(item.id)) {
        return;
      }

      if (item.id === '2') {
        const res = await new Promise((r) =>
          setTimeout(() => r(mockSecond), 2000),
        );
        setItems([...items, ...(res as ItemType<ExtraItemType>[])]);
      } else {
        setLoadedIds([...loadedIds, item.id]);
      }

      setExpandedIds([...expandedIds, item.id]);
    },
    [items, expandedIds, loadedIds],
  );

  // Scroll to load data and set it after loading
  const onScrollColumn = useCallback(
    async (column: ColumnType<ExtraItemType>) => {
      if (column.parentId === '2') {
        const res = await new Promise((r) =>
          setTimeout(() => r(mockThird), 2000),
        );
        setItems([...items, ...(res as ItemType<ExtraItemType>[])]);
        setLoadedIds([...loadedIds, column.parentId ?? 'root']);
      }
    },
    [items, loadedIds],
  );

  return useMemo(
    () => ({
      items,
      // Determine whether the column is loaded
      getHasMore(column: ColumnType<ExtraItemType>) {
        if (loadedIds.includes(column.parentId ?? 'root')) {
          return false;
        }
        return true;
      },
      onExpandItem,
      onScrollColumn,
    }),
    [items, loadedIds, onExpandItem, onScrollColumn],
  );
};
