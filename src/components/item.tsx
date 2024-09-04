import { IDType, DataType } from '../types';
import * as S from '../styled';

import { Checkbox, CheckboxPlaceholder } from './checkbox';
import { Radio } from './radio';

interface Props {
  item: DataType;
  activeId?: IDType;
  selectable: boolean;
  mode: 'single' | 'multiple';
  disabledIds: IDType[];
  selectedIds: IDType[];
  onSelectedIds: (id: IDType) => void;
  onExpand: (id: IDType) => void;
}

export const Item = ({
  item,
  activeId,
  selectable,
  mode,
  disabledIds,
  selectedIds,
  onSelectedIds,
  onExpand,
}: Props) => {
  return (
    <S.Item $actived={activeId === item.id} onClick={() => onExpand(item.id)}>
      <S.ItemInner>
        {selectable && !item.canExpand ? (
          mode === 'single' ? (
            <Radio
              disabled={disabledIds.includes(item.id)}
              checked={selectedIds[0] === item.id}
              onChange={() => onSelectedIds(item.id)}
            />
          ) : (
            <Checkbox
              disabled={disabledIds.includes(item.id)}
              checked={selectedIds.includes(item.id)}
              onChange={() => onSelectedIds(item.id)}
              inputProps={{ 'aria-label': 'controlled' }}
            />
          )
        ) : (
          <CheckboxPlaceholder />
        )}
        <S.ItemTitle>{item.title}</S.ItemTitle>
      </S.ItemInner>
      {item.canExpand ? <S.ItemIndicators /> : null}
    </S.Item>
  );
};
