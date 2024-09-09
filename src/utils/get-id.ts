import type { IDType } from '../types';

const defaultId = `root-${Date.now()}`;

export const getId = (id?: IDType) => {
  return id ?? defaultId;
};
