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
