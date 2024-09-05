import type { DataMapType } from './types';

export function reducer(
  state: DataMapType,
  action: { type: string; payload?: DataMapType },
) {
  switch (action.type) {
    case 'RESET':
      return { ...action.payload };
    case 'ADD':
      return { ...state, ...action.payload };
    default:
      return state;
  }
}
