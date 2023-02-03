import classNames from 'classnames';

import { CheckboxStatus } from './types';
import * as S from './styled';

interface Props {
  status?: CheckboxStatus | CheckboxStatus[];
  children?: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLLabelElement>) => void;
}

export const Checkbox = ({ status, children, onClick }: Props) => {
  const checkboxCls = classNames('checkbox', {
    'checkbox-checked':
      status === CheckboxStatus.checked ||
      (Array.isArray(status) && status.includes(CheckboxStatus.checked)),
    'checkbox-indeterminate':
      status === CheckboxStatus.indeterminate ||
      (Array.isArray(status) && status.includes(CheckboxStatus.indeterminate)),
    'checkbox-disabled':
      status === CheckboxStatus.disabled ||
      (Array.isArray(status) && status?.includes(CheckboxStatus.disabled)),
  });

  const handleClick = (e: React.MouseEvent<HTMLLabelElement>) => {
    if (status === CheckboxStatus.disabled) return;
    onClick?.(e);
  };

  return (
    <S.Label onClick={handleClick}>
      <span className={checkboxCls} />
      {children && <span className="text">{children}</span>}
    </S.Label>
  );
};
