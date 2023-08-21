import type { ItemType } from '../../hooks';

import { Checkbox, CheckboxStatus } from '../checkbox';

import { ItemStatus } from './types';
import * as S from './styled';

interface Props<T> {
  item: ItemType<T>;
  status: ItemStatus;
  checkStatus: CheckboxStatus;
  onExpand: (it: ItemType<T>) => void;
  onSelect: (it: ItemType<T>) => void;
}

export const Item = <T,>({
  item,
  status,
  checkStatus,
  onSelect,
  onExpand,
}: Props<T>) => {
  const handleRowClick = () => {
    if (item.canExpand) {
      onExpand(item);
    }
    handleCheckboxClick();
  };

  const handleCheckboxClick = () => {
    if (checkStatus === CheckboxStatus.disabled) {
      return;
    }
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
