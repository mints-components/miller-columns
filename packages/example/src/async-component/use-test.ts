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
import type { McsID, McsItem } from 'miller-columns-select';

import type { ExtraItemType } from '../types';

import {
  mock_1,
  mock_1_1,
  mock_1_1_1,
  mock_2_1,
  mock_2_1_1,
  mock_2_2,
  mock_7_1,
} from './mock';

export const useTest = () => {
  const [items, setItems] = useState<McsItem<ExtraItemType>[]>([]);
  // Record whether the column has been loaded
  const [loadedIds, setLoadedIds] = useState<McsID[]>([]);

  // Get the initial items data
  // And know whether the first column has completed all data loaded
  useEffect(() => {
    (async () => {
      const res = await new Promise((r) => setTimeout(() => r(mock_1), 1000));
      setItems(res as McsItem<ExtraItemType>[]);
      setLoadedIds(['root']);
    })();
  }, []);

  // Load more data when expanding
  // And judge whether the item is expanded
  const onExpand = useCallback(
    async (id: McsID) => {
      if (id === '1') {
        const res = await new Promise((r) =>
          setTimeout(() => r(mock_1_1), 1000),
        );
        setItems([...items, ...(res as McsItem<ExtraItemType>[])]);
        setLoadedIds([...loadedIds, '1']);
      } else if (id === '1-1') {
        const res = await new Promise((r) =>
          setTimeout(() => r(mock_1_1_1), 1000),
        );
        setItems([...items, ...(res as McsItem<ExtraItemType>[])]);
        setLoadedIds([...loadedIds, '1-1']);
      } else if (id === '2') {
        const res = await new Promise((r) =>
          setTimeout(() => r(mock_2_1), 1000),
        );
        setItems([...items, ...(res as McsItem<ExtraItemType>[])]);
      } else if (id === '2-1') {
        const res = await new Promise((r) =>
          setTimeout(() => r(mock_2_1_1), 1000),
        );
        setItems([...items, ...(res as McsItem<ExtraItemType>[])]);
        setLoadedIds([...loadedIds, '2-1']);
      } else if (id === '7') {
        const res = await new Promise((r) =>
          setTimeout(() => r(mock_7_1), 1000),
        );
        setItems([...items, ...(res as McsItem<ExtraItemType>[])]);
        setLoadedIds([...loadedIds, '7']);
      }
    },
    [items, loadedIds],
  );

  // Scroll to load data and set it after loading
  const onScroll = useCallback(
    async (id: McsID | null) => {
      console.log(1);
      if (id === '2') {
        const res = await new Promise((r) =>
          setTimeout(() => r(mock_2_2), 1000),
        );
        setItems([...items, ...(res as McsItem<ExtraItemType>[])]);
        setLoadedIds([...loadedIds, '2']);
      }
    },
    [items, loadedIds],
  );

  return useMemo(
    () => ({
      items,
      // Determine whether the column is loaded
      getHasMore(id: McsID | null) {
        return !loadedIds.includes(id ?? 'root');
      },
      onExpand,
      onScroll,
    }),
    [items, loadedIds, onExpand, onScroll],
  );
};
