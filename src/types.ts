export type IDType = string | number;

export type RequestResType = {
  data: DataType[];
  hasMore: boolean;
  params?: any;
};

export type ColumnType = {
  targetId: string;
  id?: IDType;
  items: DataType[];
  hasMore: boolean;
};

export type DataType = {
  parentId: IDType | null;
  id: IDType;
  title: string;
  canExpand: boolean;
};

export type DataMapValueType = {
  parentId: IDType | null;
  id: IDType;
  items: DataType[];
  canExpand: boolean;
  expanded: boolean;
  hasMore: boolean;
  params?: any;
};

export type DataMapType = Record<IDType, DataMapValueType>;
