import type { ItemType } from '../../types';

import type { CheckboxStatus } from '../checkbox/types';
import { Checkbox } from '../checkbox';

import { ItemStatus } from './types';
import * as S from './styled';

interface Props<T> {
  item: ItemType<T>;
  status: ItemStatus;
  checkStatus: CheckboxStatus;
  onSelect: (it: ItemType<T>) => void;
  onExpand: (it: ItemType<T>) => void;
}

export const Item = <T,>({
  item,
  status,
  checkStatus,
  onSelect,
  onExpand,
}: Props<T>) => {
  const handleRowClick = () => {
    if (!item.canExpand) {
      return;
    }

    onExpand(item);
  };

  const handleCheckboxClick = () => {
    onSelect(item);
  };

  return (
    <S.Wrapper
      selected={status === ItemStatus.selected}
      onClick={handleRowClick}
    >
      <Checkbox status={checkStatus} onClick={handleCheckboxClick}>
        {item.title}
      </Checkbox>
      {item.canExpand && <span className="indicator" />}
    </S.Wrapper>
  );
};
