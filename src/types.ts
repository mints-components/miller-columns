export type ItemType<T> = {
  parentId: string | number | null;
  id: string | number;
  title: string;
} & T;

export interface IMillerColumns<T> {
  items: ItemType<T>[];
}
