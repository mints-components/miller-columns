export type ItemType = {
  parentId: string | number | null;
  id: string | number;
  title: string;
  children?: ItemType[];
};

export type DataType<T> = ItemType & T;
