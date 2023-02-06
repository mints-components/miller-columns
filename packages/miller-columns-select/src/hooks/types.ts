import type {
  MillerColumnsSelectID,
  MillerColumnsSelectItemType,
  MillerColumnsSelectColumnType,
} from '../types';

export type ID = MillerColumnsSelectID;

export type ItemType<T> = MillerColumnsSelectItemType<T> & {
  items: ItemType<T>[];
  canExpand: boolean;
  childLoaded: boolean;
};

export type ColumnType<T> = MillerColumnsSelectColumnType & {
  activeId: ID | null;
  items: ItemType<T>[];
  hasMore: boolean;
};

export type ColumnMapType<T> = Record<ID, ItemType<T>>;
