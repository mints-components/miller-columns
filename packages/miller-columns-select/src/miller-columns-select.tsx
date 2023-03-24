import type { McsID, McsItem, McsColumn } from './types';
import { useItems, useColumns, useItem } from './hooks';
import { Column, Item, ItemAll } from './components';
import * as S from './styled';

export interface MillerColumnsSelectProps<T> {
  items: McsItem<T>[];
  getCanExpand?: (item: McsItem<T>) => boolean;
  getHasMore?: (id: McsID | null) => boolean;
  onExpand?: (id: McsID) => void;
  onScroll?: (id: McsID | null) => void;
  style?: React.CSSProperties;
  columnCount?: number;
  columnHeight?: number;
  renderHeader?: (columns: McsColumn[]) => React.ReactNode;
  renderFooter?: (columns: McsColumn[]) => React.ReactNode;
  renderTitle?: (column: McsColumn) => React.ReactNode;
  renderEnd?: (column: McsColumn) => React.ReactNode;
  renderLoading?: (column: McsColumn) => React.ReactNode;
  selectedIds?: McsID[];
  onSelectItemIds?: (selectedIds: McsID[]) => void;
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
  const transformItems = useItems<T>({
    items,
    getCanExpand,
    getHasMore,
  });

  const { columns, onExpandItem } = useColumns<T>({
    items: transformItems,
    getHasMore,
    onExpand,
  });

  const {
    getItemStatus,
    getItemCheckStatus,
    getItemAllCheckStatus,
    onSelectItem,
    onSelectItemAll,
  } = useItem<T>({
    items: transformItems,
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
            renderItemAll={() => (
              <ItemAll
                status={getItemAllCheckStatus()}
                onSelect={onSelectItemAll}
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
