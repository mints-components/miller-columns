import type { McsID } from 'miller-columns-select';

import {
  init,
  initScroll,
  mock_1,
  mock_1_1,
  mock_2,
  mock_2_scroll,
  mock_2_1,
  mock_7,
} from './data';

export const getItems = (
  pageSize = 1,
  parentId?: McsID | null,
): Promise<{ data: []; hasMore: boolean }> =>
  new Promise((r) =>
    setTimeout(() => {
      let result: any;

      switch (true) {
        case !parentId && pageSize === 1:
          result = {
            data: init,
            hasMore: true,
          };
          break;
        case !parentId:
          result = {
            data: initScroll,
            hasMore: false,
          };
          break;
        case parentId === '1':
          result = {
            data: mock_1,
            hasMore: false,
          };
          break;
        case parentId === '1-1':
          result = {
            data: mock_1_1,
            hasMore: false,
          };
          break;
        case parentId === '2' && pageSize === 1:
          result = {
            data: mock_2,
            hasMore: true,
          };
          break;
        case parentId === '2':
          result = {
            data: mock_2_scroll,
            hasMore: false,
          };
          break;
        case parentId === '2-1':
          result = {
            data: mock_2_1,
            hasMore: false,
          };
          break;
        case parentId === '7-1':
          result = {
            data: mock_7,
            hasMore: false,
          };
          break;
      }

      r(result);
    }, 1000),
  );
