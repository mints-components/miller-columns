export enum MCCheckboxStatus {
  unchecked = 'unchecked',
  checked = 'checked',
  indeterminate = 'indeterminate',
  disabled = 'disabled',
}

export enum MCItemStatus {
  unselected = 'unselected',
  selected = 'selected',
}

export type MCItem<T> = {
  title: string;
  canExpand?: boolean;
} & T;
