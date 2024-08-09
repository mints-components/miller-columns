import type { IMillerColumns } from './types';
import { checkId } from './utils';

export const MillerColumns = <T>({ items }: IMillerColumns<T>) => {
  if (!checkId(items)) {
    throw new Error('Items must have unique id and parentId');
  }

  return null;
};
