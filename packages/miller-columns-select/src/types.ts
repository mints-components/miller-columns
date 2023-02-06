export type MillerColumnsSelectID = string | number;

export type MillerColumnsSelectItemType<T> = {
  parentId: MillerColumnsSelectID | null;
  id: MillerColumnsSelectID;
  title: string;
} & T;

export type MillerColumnsSelectColumnType = {
  parentId: MillerColumnsSelectID | null;
  parentTitle: string | null;
};
