import { useState, useEffect, useCallback, useMemo } from 'react';

import type { ColumnType, ID, ItemType } from '../types';
import { ItemStatus, CheckboxStatus } from '../types';

import { useItemMap } from './use-item-map';
import { useColumns } from './use-columns';

export interface UseMillerColumnsProps<T> {
  items: ItemType<T>[];
  disabledIds?: ID[];
  selectedIds?: ID[];
  onSelectItemIds?: (selectedIds: ID[]) => void;
  onExpandItem?: (item: ItemType<T>) => void;
}

export const useMillerColumns = <T>({
  items,
  disabledIds,
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
    item.items?.forEach((child) => {
      result.push(child.id);
      result.push(...collectChildIds(child));
    });
    return result;
  }, []);

  const collectAddParentIds = useCallback(
    (item: ItemType<T>) => {
      const result: ID[] = [];
      const parentItem = itemMap[item.parentId ?? ''];
      if (parentItem) {
        const allChildSelected = parentItem.items?.every((it) =>
          [...selectedIds, item.id].includes(it.id),
        );
        if (allChildSelected) {
          result.push(parentItem.id);
          result.push(...collectAddParentIds(parentItem));
        }
      }
      return result;
    },
    [itemMap, selectedIds],
  );

  const collectRemoveParentIds = useCallback(
    (item: ItemType<T>) => {
      const result: ID[] = [];
      const parentItem = itemMap[item.parentId ?? ''];
      if (parentItem) {
        result.push(parentItem.id);
        result.push(...collectRemoveParentIds(parentItem));
      }
      return result;
    },
    [itemMap],
  );

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
        const childSelectedItems =
          item.items?.filter((it) => selectedIds.includes(it.id)) ?? [];

        switch (true) {
          case (canExpand && !allChildLoaded) || disabledIds?.includes(item.id):
            return CheckboxStatus.disabled;
          case selectedIds.includes(item.id):
            return CheckboxStatus.checked;
          case !!childSelectedItems.length:
            return CheckboxStatus.indeterminate;
          default:
            return CheckboxStatus.nochecked;
        }
      },
      onExpandItem(item: ItemType<T>) {
        setActiveId(item.id);
        onExpandItem?.(item);
      },
      onSelectItem: (item: ItemType<T>) => {
        let newIds: ID[] = [];
        const isRemoveExistedItem = !!selectedIds.includes(item.id);
        if (!isRemoveExistedItem) {
          newIds.push(...[...selectedIds, item.id]);
          newIds.push(...collectChildIds(item));
          newIds.push(...collectAddParentIds(item));
        } else {
          newIds = selectedIds.filter(
            (id) =>
              ![
                item.id,
                ...collectChildIds(item),
                ...collectRemoveParentIds(item),
              ].includes(id),
          );

          console.log([
            item.id,
            ...collectChildIds(item),
            ...collectRemoveParentIds(item),
          ]);
        }

        onSelectItemIds ? onSelectItemIds(newIds) : setSelectedIds(newIds);
      },
    }),
    [
      columns,
      disabledIds,
      selectedIds,
      collectChildIds,
      collectAddParentIds,
      collectRemoveParentIds,
      onSelectItemIds,
      setSelectedIds,
      onExpandItem,
    ],
  );
};
