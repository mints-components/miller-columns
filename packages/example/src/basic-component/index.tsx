import MillerColumnsSelect, {
  MillerColumnsSelectProps,
} from 'miller-columns-select';

import type { ExtraItemType } from '../types';

import { mockData } from './mock';

export const BasicMillerColumnsSelect = (
  props: Omit<MillerColumnsSelectProps<ExtraItemType>, 'items'>,
) => {
  return <MillerColumnsSelect {...props} items={mockData} />;
};
