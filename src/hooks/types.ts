import type { McsID, McsItem, McsColumn } from '../types';

export type ID = McsID;

export type ItemType<T> = McsItem<T> & {
  items: ItemType<T>[];
  canExpand: boolean;
  childLoaded: boolean;
};

export type ColumnType<T> = McsColumn & {
  activeId: ID | null;
  items: ItemType<T>[];
  hasMore: boolean;
  hasError: boolean;
};

export type ColumnMapType<T> = Record<ID, ItemType<T>>;
