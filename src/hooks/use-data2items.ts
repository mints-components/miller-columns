import { useMemo } from 'react';

import type { DataType } from '../types';

export const useData2Items = <T>(data: DataType<T>[]) =>
  useMemo(() => {
    return data.map((it) => ({
      ...it,
      children: data.filter((i) => i.parentId === it.id),
    }));
  }, [data]);
