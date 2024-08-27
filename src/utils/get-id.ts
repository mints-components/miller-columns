import type { IDType } from '../types';

const defaultId = Date.now();

export const getId = (id?: IDType) => {
  return id ?? defaultId;
};
