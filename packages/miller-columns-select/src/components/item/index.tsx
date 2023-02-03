import { ItemType, ItemStatus, CheckboxStatus } from '../../types';

import { Checkbox } from '../checkbox';

import * as S from './styled';

interface Props<T> {
  item: ItemType<T>;
  canExpand: boolean;
  status: ItemStatus;
  checkStatus: CheckboxStatus;
  onSelect: (it: ItemType<T>, canExpand: boolean) => void;
  onExpand: (it: ItemType<T>) => void;
}

export const Item = <T,>({
  item,
  canExpand,
  status,
  checkStatus,
  onSelect,
  onExpand,
}: Props<T>) => {
  const handleRowClick = () => {
    if (canExpand) {
      onExpand(item);
    }
  };

  const handleCheckboxClick = () => {
    onSelect(item, canExpand);
  };

  return (
    <S.Wrapper
      selected={status === ItemStatus.selected}
      onClick={handleRowClick}
    >
      <Checkbox status={checkStatus} onClick={handleCheckboxClick}>
        {item.title}
      </Checkbox>
      {canExpand && <span className="indicator" />}
    </S.Wrapper>
  );
};
