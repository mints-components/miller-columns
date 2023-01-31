import { useState, useEffect, useCallback, useMemo } from 'react';

import type { ColumnType, ID, ItemType } from '../types';
import { ItemStatus, CheckboxStatus } from '../types';

import { useItemMap } from './use-item-map';
import { useColumns } from './use-columns';

export interface UseMillerColumnsProps<T> {
  items: ItemType<T>[];
  selectedIds?: ID[];
  onSelectItemIds?: (selectedIds: ID[]) => void;
  onExpandItem?: (item: ItemType<T>) => void;
}

export const useMillerColumns = <T>({
  items,
  onSelectItemIds,
  onExpandItem,
  ...props
}: UseMillerColumnsProps<T>) => {
  const [activeId, setActiveId] = useState<ID>();
  const [selectedIds, setSelectedIds] = useState<ID[]>([]);

  const itemMap = useItemMap<T>({ items });
  const columns = useColumns<T>({ activeId, itemMap });

  useEffect(() => {
    setSelectedIds(props.selectedIds ?? []);
  }, [props.selectedIds]);

  const collectChildIds = useCallback((item: ItemType<T>) => {
    const result: ID[] = [];

    if (item.items.length) {
      item.items.forEach((child) => {
        result.push(...collectChildIds(child));
      });
    } else {
      result.push(item.id);
    }

    return result;
  }, []);

  return useMemo(
    () => ({
      columns,
      getItemStatus(item: ItemType<T>, column: ColumnType<T>) {
        if (item.id === column.activeId) {
          return ItemStatus.selected;
        }
        return ItemStatus.noselected;
      },
      getItemCheckStatus(
        item: ItemType<T>,
        canExpand: boolean,
        allChildLoaded: boolean,
      ) {
        const childIds = collectChildIds(item);

        switch (true) {
          case canExpand && !allChildLoaded:
            return CheckboxStatus.disabled;
          case selectedIds.includes(item.id) ||
            childIds.every((id) => selectedIds.includes(id)):
            return CheckboxStatus.checked;
          case !!childIds.find((id) => selectedIds.includes(id)):
            return CheckboxStatus.indeterminate;
          default:
            return CheckboxStatus.nochecked;
        }
      },
      onExpandItem(item: ItemType<T>) {
        setActiveId(item.id);
        onExpandItem?.(item);
      },
      onSelectItem: (item: ItemType<T>, canExpand: boolean) => {
        let newIds: ID[] = [];

        const childIds = collectChildIds(item);

        switch (true) {
          case !canExpand && !selectedIds.includes(item.id):
            newIds.push(...[item.id, ...selectedIds]);
            break;
          case !canExpand && selectedIds.includes(item.id):
            newIds.push(...selectedIds.filter((id) => id !== item.id));
            break;
          case canExpand && !childIds.every((id) => selectedIds.includes(id)):
            newIds.push(
              ...[
                ...selectedIds,
                ...childIds.filter((id) => !selectedIds.includes(id)),
              ],
            );
            break;
          case canExpand && childIds.every((id) => selectedIds.includes(id)):
            newIds.push(...selectedIds.filter((id) => !childIds.includes(id)));
            break;
        }

        onSelectItemIds ? onSelectItemIds(newIds) : setSelectedIds(newIds);
      },
    }),
    [columns, selectedIds, collectChildIds, onSelectItemIds, onExpandItem],
  );
};
