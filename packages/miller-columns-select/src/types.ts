export type McsID = string | number;

export type McsItem<T> = {
  parentId: McsID | null;
  id: McsID;
  title: string;
} & T;

export type McsColumn = {
  parentId: McsID | null;
  parentTitle: string | null;
};
