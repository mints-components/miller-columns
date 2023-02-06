import type {
  MillerColumnsSelectID,
  MillerColumnsSelectItemType,
  MillerColumnsSelectColumnType,
} from './types';
import { useItems, useColumns, useItem } from './hooks';
import { Column, Item } from './components';
import * as S from './styled';

export interface MillerColumnsSelectProps<T> {
  items: MillerColumnsSelectItemType<T>[];
  getCanExpand: (item: MillerColumnsSelectItemType<T>) => boolean;
  getHasMore?: (id: MillerColumnsSelectID | null) => boolean;
  onExpand?: (id: MillerColumnsSelectID) => void;
  onScroll?: (id: MillerColumnsSelectID | null) => void;
  style?: React.CSSProperties;
  columnCount?: number;
  columnHeight?: number;
  renderHeader?: (columns: MillerColumnsSelectColumnType[]) => React.ReactNode;
  renderFooter?: (columns: MillerColumnsSelectColumnType[]) => React.ReactNode;
  renderTitle?: (column: MillerColumnsSelectColumnType) => React.ReactNode;
  renderEnd?: (column: MillerColumnsSelectColumnType) => React.ReactNode;
  renderLoading?: (column: MillerColumnsSelectColumnType) => React.ReactNode;
  selectedIds?: MillerColumnsSelectID[];
  onSelectItemIds?: (selectedIds: MillerColumnsSelectID[]) => void;
}

export const MillerColumnsSelect = <T,>({
  items,
  getCanExpand,
  getHasMore = () => false,
  onExpand,
  onScroll,
  style,
  columnCount,
  columnHeight,
  renderHeader,
  renderFooter,
  renderTitle,
  renderEnd,
  renderLoading,
  selectedIds,
  onSelectItemIds,
}: MillerColumnsSelectProps<T>) => {
  console.log(items);

  const transformItems = useItems<T>({
    items,
    getCanExpand,
    getHasMore,
  });

  // console.log(transformItems);

  const { columns, onExpandItem } = useColumns<T>({
    items: transformItems,
    getHasMore,
    onExpand,
  });

  const { getItemStatus, getItemCheckStatus, onSelectItem } = useItem<T>({
    selectedIds,
    onSelectItemIds,
  });

  const header = renderHeader?.(columns) ?? null;
  const footer = renderFooter?.(columns) ?? null;

  return (
    <S.Container style={style}>
      {header}
      <div className="main">
        {columns.map((column) => (
          <Column<T>
            key={column.parentId}
            count={columnCount ?? 3}
            column={column}
            height={columnHeight}
            renderItem={(item) => (
              <Item
                key={`${item.id}${item.canExpand ? '-expand' : ''}`}
                item={item}
                status={getItemStatus(item, column)}
                checkStatus={getItemCheckStatus(item)}
                onExpand={onExpandItem}
                onSelect={onSelectItem}
              />
            )}
            renderTitle={renderTitle}
            renderEnd={renderEnd}
            renderLoading={renderLoading}
            onScroll={onScroll}
          />
        ))}
      </div>
      {footer}
    </S.Container>
  );
};
