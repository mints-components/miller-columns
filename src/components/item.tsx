import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

import { IDType, DataType } from '../types';
import * as S from '../styled';

import { Checkbox, CheckboxPlaceholder } from './checkbox';

interface Props {
  item: DataType;
  activeId?: IDType;
  selectable: boolean;
  disabledIds: IDType[];
  selectedIds: IDType[];
  onSelectedIds: (id: IDType) => void;
  onExpand: (id: IDType) => void;
}

export const Item = ({
  activeId,
  item,
  selectable,
  disabledIds,
  selectedIds,
  onSelectedIds,
  onExpand,
}: Props) => {
  return (
    <S.Item $actived={activeId === item.id} onClick={() => onExpand(item.id)}>
      {selectable && !item.canExpand ? (
        <Checkbox
          disabled={disabledIds.includes(item.id)}
          checked={selectedIds.includes(item.id)}
          onChange={() => onSelectedIds(item.id)}
          inputProps={{ 'aria-label': 'controlled' }}
        />
      ) : (
        <CheckboxPlaceholder />
      )}
      <S.ItemTitle>{item.title}</S.ItemTitle>
      {item.canExpand ? (
        <ArrowForwardIosIcon
          sx={{
            fontSize: 16,
          }}
        />
      ) : null}
    </S.Item>
  );
};
