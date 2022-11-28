export enum CheckboxStatus {
  nochecked = 'nochecked',
  checked = 'checked',
  indeterminate = 'indeterminate',
  disabled = 'disabled',
}

export type ID = string | number;

export type ItemType<T> = {
  parentId: ID | null;
  id: ID;
  title: string;
  items?: ItemType<T>[];
} & T;

export enum ItemStatus {
  selected = 'selected',
  noselected = 'noselected',
}

export type ColumnType<T> = {
  parentId: ID | null;
  items: ItemType<T>[];
  activeId: ID | null;
};

export type ItemMapType<T> = Record<ID, ItemType<T>>;
