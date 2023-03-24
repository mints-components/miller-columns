import { Checkbox, CheckboxStatus } from '../checkbox';

import * as S from './styled';

interface Props {
  status: CheckboxStatus;
  onSelect: () => void;
}

export const ItemAll = ({ status, onSelect }: Props) => {
  const handleCheckboxClick = () => {
    if (status === CheckboxStatus.disabled) {
      return;
    }
    onSelect();
  };

  return (
    <S.Wrapper selected={false} onClick={handleCheckboxClick}>
      <Checkbox status={status} onClick={handleCheckboxClick}>
        ALL
      </Checkbox>
    </S.Wrapper>
  );
};
