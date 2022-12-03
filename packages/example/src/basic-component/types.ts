import type { ItemType, ColumnType } from 'miller-columns-select';

export enum TypeEnum {
  folder = 'folder',
  file = 'file',
}

export type TestItemType = ItemType<{
  type: 'folder' | 'file';
}>;

export type TestColumnType = ColumnType<{
  type: 'folder' | 'file';
}>;
