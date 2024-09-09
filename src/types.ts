export type IDType = string | number;

export type RequestResType = {
  data: DataType[];
  hasMore: boolean;
  error?: {
    message: string;
  };
  params?: any;
  originData?: any[];
};

export type ColumnType = {
  id?: IDType;
  items: DataType[];
  hasMore: boolean;
  error?: {
    message: string;
  };
};

export type DataType = {
  parentId: IDType | null;
  id: IDType;
  title: string;
  canExpand?: boolean;
};

export type DataMapValueType = {
  parentId: IDType | null;
  id?: IDType;
  items: DataType[];
  canExpand: boolean;
  expanded: boolean;
  hasMore: boolean;
  error?: {
    message: string;
  };
  params?: any;
};

export type DataMapType = Record<IDType, DataMapValueType>;
