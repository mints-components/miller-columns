import classNames from 'classnames';

import { RadioStatus } from './types';
import * as S from './styled';

interface Props {
  status?: RadioStatus;
  children?: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLLabelElement>) => void;
}

export const Radio = ({ status, children, onClick }: Props) => {
  const radiosCls = classNames('radio', {
    'radio-checked': status === RadioStatus.checked,
    'radio-disabled': status === RadioStatus.disabled,
  });

  const handleClick = (e: React.MouseEvent<HTMLLabelElement>) => {
    if (status === RadioStatus.disabled) return;
    onClick?.(e);
  };

  return (
    <S.Label onClick={handleClick}>
      <span className={radiosCls} />
      {children && <span className="text">{children}</span>}
    </S.Label>
  );
};
