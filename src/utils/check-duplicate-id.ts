import { uniqBy } from 'lodash';

import type { DataType } from '../types';

export const checkduplicateId = <T>(data: DataType<T>[]) => {
  return uniqBy(data, (it) => it.id).length === data.length;
};
