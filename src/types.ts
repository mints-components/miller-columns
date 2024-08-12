export type ItemType = {
  parentId: string | number | null;
  id: string | number;
  title: string;
};

export type DataType<T> = ItemType & T;
