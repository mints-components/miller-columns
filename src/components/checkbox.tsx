import { useState, useEffect } from 'react';
import classNames from 'classnames';

import * as Types from '../types';
import * as Styles from '../styled';

interface Props {
  status?: Types.MCCheckboxStatus;
  children?: React.ReactNode;
  onChecked?: (newStatus: Types.MCCheckboxStatus) => void;
}

export const Checkbox = ({ children, onChecked, ...props }: Props) => {
  const [status, setStatus] = useState<Types.MCCheckboxStatus>(
    Types.MCCheckboxStatus.unchecked,
  );

  useEffect(() => {
    setStatus(props.status ?? Types.MCCheckboxStatus.unchecked);
  }, [props.status]);

  const checkboxCls = classNames('checkbox', {
    'checkbox-checked': status === Types.MCCheckboxStatus.checked,
    'checkbox-indeterminate': status === Types.MCCheckboxStatus.indeterminate,
    'checkbox-disabled': status === Types.MCCheckboxStatus.disabled,
  });

  const handleClick = () => {
    if (status === Types.MCCheckboxStatus.disabled) return;

    const newStatus =
      status !== Types.MCCheckboxStatus.checked
        ? Types.MCCheckboxStatus.checked
        : Types.MCCheckboxStatus.unchecked;

    onChecked ? onChecked(newStatus) : setStatus(newStatus);
  };

  return (
    <Styles.Checkbox onClick={handleClick}>
      <span className={checkboxCls} />
      {children && <span className="text">{children}</span>}
    </Styles.Checkbox>
  );
};
