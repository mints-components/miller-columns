import { useState, useEffect } from 'react';

import * as Types from '../types';
import * as Styled from '../styled';

import { Checkbox } from './checkbox';

interface Props<T> {
  item: Types.MCItem<T>;
  checkable?: boolean;
  status?: Types.MCItemStatus;
  checkStatus?: Types.MCCheckboxStatus;
  onExpand?: (item: Types.MCItem<T>) => void;
  onChecked?: (item: Types.MCItem<T>) => void;
}

export const Item = <T,>({
  item,
  checkable = false,
  checkStatus,
  onExpand,
  onChecked,
  ...props
}: Props<T>) => {
  const [status, setStatus] = useState<Types.MCItemStatus>(
    Types.MCItemStatus.unselected,
  );

  useEffect(() => {
    setStatus(props.status ?? Types.MCItemStatus.unselected);
  }, [props.status]);

  const handleRowClick = () => {
    if (!item.canExpand) return;

    const newStatus =
      status !== Types.MCItemStatus.selected
        ? Types.MCItemStatus.selected
        : Types.MCItemStatus.unselected;

    onExpand ? onExpand(item) : setStatus(newStatus);
  };

  const handleChecked = () => onChecked?.(item);

  return (
    <Styled.Item
      actived={status === Types.MCItemStatus.selected}
      onClick={handleRowClick}
    >
      {checkable ? (
        <Checkbox status={checkStatus} onChecked={handleChecked}>
          {item.title}
        </Checkbox>
      ) : (
        <span>{item.title}</span>
      )}
      {item.canExpand && <span className="indicator" />}
    </Styled.Item>
  );
};
