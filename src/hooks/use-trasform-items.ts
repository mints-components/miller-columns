import { useMemo } from 'react';

import type { IMillerColumns } from '../types';

export const useTransformItems = <T>(items: IMillerColumns<T>['items']) =>
  useMemo(() => {
    return items.map((it) => ({
      ...it,
      children: items.filter((i) => i.parentId === it.id),
    }));
  }, [items]);
