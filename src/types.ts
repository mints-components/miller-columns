type ItemType<T> = {
  parentId: string | number;
  id: string | number;
  title: string;
} & T;

export interface IMillerColumns<T> {
  items: ItemType<T>[];
}
