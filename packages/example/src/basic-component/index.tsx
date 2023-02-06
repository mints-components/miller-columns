import type { McsID } from 'miller-columns-select';
import MillerColumnsSelect, {
  MillerColumnsSelectProps,
} from 'miller-columns-select';

import type { ExtraItemType } from '../types';
import { TypeEnum } from '../types';

import { mockData } from './mock';

export const BasicMillerColumnsSelect = (
  props: Omit<
    MillerColumnsSelectProps<ExtraItemType>,
    'items' | 'getCanExpand' | 'onExpand'
  >,
) => {
  const handleExpand = (id: McsID) => {
    // console.log(id);
  };

  return (
    <MillerColumnsSelect
      {...props}
      items={mockData}
      getCanExpand={(item) => item.type === TypeEnum.folder}
      onExpand={handleExpand}
    />
  );
};
