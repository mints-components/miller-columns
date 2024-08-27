import type { DataType } from './types';
import { checkduplicateId } from './utils';
import { useData2Items, useColumns } from './hooks';
import { Column } from './column';
import * as S from './styled';

export interface IMillerColumns<T> {
  data: DataType<T>[];
}

export const MillerColumns = <T,>({ data }: IMillerColumns<T>) => {
  if (!checkduplicateId(data)) {
    throw new Error('Data must have unique id');
  }

  const items = useData2Items(data);

  const { columns, activeId, onExpand } = useColumns(items);

  return (
    <S.Container>
      {columns.map(({ targetId, items, hasMore }) => (
        <Column
          targetId={targetId}
          items={items}
          activeId={activeId}
          hasMore={hasMore}
          onExpand={onExpand}
        />
      ))}
    </S.Container>
  );
};
