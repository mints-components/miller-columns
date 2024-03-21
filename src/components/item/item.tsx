import type { ItemType } from '../../hooks';

import { Checkbox, CheckboxStatus } from '../checkbox';
import { Radio, RadioStatus } from '../radio';

import { ItemStatus } from './types';
import * as S from './styled';

interface Props<T> {
  mode: 'single' | 'multiple';
  item: ItemType<T>;
  status: ItemStatus;
  radioStatus: RadioStatus;
  checkStatus: CheckboxStatus;
  onExpand: (it: ItemType<T>) => void;
  onSelect: (it: ItemType<T>) => void;
}

export const Item = <T,>({
  mode,
  item,
  status,
  radioStatus,
  checkStatus,
  onSelect,
  onExpand,
}: Props<T>) => {
  const handleRowClick = () => {
    if (item.canExpand) {
      onExpand(item);
    }
    handleClick();
  };

  const handleClick = () => {
    if (
      radioStatus === RadioStatus.disabled ||
      checkStatus === CheckboxStatus.disabled
    ) {
      return;
    }
    onSelect(item);
  };

  return (
    <S.Wrapper
      selected={status === ItemStatus.selected}
      onClick={handleRowClick}
    >
      {mode === 'single' &&
        (!item.canExpand ? (
          <Radio status={radioStatus} onClick={handleClick}>
            {item.title}
          </Radio>
        ) : (
          <span style={{ paddingLeft: 22, fontSize: 14 }}>{item.title}</span>
        ))}
      {mode === 'multiple' && (
        <Checkbox status={checkStatus} onClick={handleClick}>
          {item.title}
        </Checkbox>
      )}
      {item.canExpand && <span className="indicator" />}
    </S.Wrapper>
  );
};
