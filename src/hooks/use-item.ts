import { useState, useMemo, useCallback, useEffect } from 'react';

import { ItemStatus, RadioStatus, CheckboxStatus } from '../components';

import type { ID, ItemType, ColumnType } from './types';

interface Props<T> {
  mode: 'single' | 'multiple';
  items: ItemType<T>[];
  getHasMore?: (columnId: ID | null) => boolean;
  selectedIds?: ID[];
  onSelectItemIds?: (selectedIds: ID[]) => void;
}

export const useItem = <T>({
  mode,
  items,
  getHasMore,
  onSelectItemIds,
  ...props
}: Props<T>) => {
  const [selectedIds, setSelectedIds] = useState<ID[]>([]);

  useEffect(() => {
    setSelectedIds(props.selectedIds ?? []);
  }, [props.selectedIds]);

  const canSelectedAllItemIds = useMemo(
    () =>
      items.filter((it) => !it.canExpand && !it.disabled).map((it) => it.id),
    [items],
  );

  const collectChildIds = useCallback((item: ItemType<T>) => {
    const result: ID[] = [];

    if (item.canExpand) {
      item.items.forEach((child) => {
        result.push(...collectChildIds(child));
      });
    } else if (!item.disabled) {
      result.push(item.id);
    }

    return result;
  }, []);

  const onSelectSingleItem = useCallback(
    (item: ItemType<T>) => {
      onSelectItemIds ? onSelectItemIds([item.id]) : setSelectedIds([item.id]);
    },
    [onSelectItemIds, setSelectedIds],
  );

  const onSelectMultipleItem = useCallback(
    (item: ItemType<T>) => {
      let newIds: ID[] = [];

      const childIds = collectChildIds(item);

      switch (true) {
        case !item.canExpand && !selectedIds.includes(item.id):
          newIds.push(...[item.id, ...selectedIds]);
          break;
        case !item.canExpand && selectedIds.includes(item.id):
          newIds.push(...selectedIds.filter((id) => id !== item.id));
          break;
        case item.canExpand &&
          !childIds.every((id) => selectedIds.includes(id)):
          newIds.push(
            ...[
              ...selectedIds,
              ...childIds.filter((id) => !selectedIds.includes(id)),
            ],
          );
          break;
        case item.canExpand && childIds.every((id) => selectedIds.includes(id)):
          newIds.push(...selectedIds.filter((id) => !childIds.includes(id)));
          break;
      }

      onSelectItemIds ? onSelectItemIds(newIds) : setSelectedIds(newIds);
    },
    [onSelectItemIds, selectedIds, collectChildIds, setSelectedIds],
  );

  return useMemo(
    () => ({
      getItemStatus(item: ItemType<T>, column: ColumnType<T>) {
        if (item.canExpand && item.id === column.activeId) {
          return ItemStatus.selected;
        }
        return ItemStatus.noselected;
      },
      getItemRadioStatus(item: ItemType<T>) {
        switch (true) {
          case item.disabled:
            return RadioStatus.disabled;
          case selectedIds.includes(item.id):
            return RadioStatus.checked;
          default:
            return RadioStatus.nochecked;
        }
      },
      getItemCheckStatus(item: ItemType<T>) {
        const childIds = collectChildIds(item);

        switch (true) {
          case item.disabled ||
            !item.childLoaded ||
            (item.canExpand && childIds.length === 0):
            return CheckboxStatus.disabled;
          case !item.canExpand && selectedIds.includes(item.id):
            return CheckboxStatus.checked;
          case item.canExpand &&
            childIds.every((id) => selectedIds.includes(id)):
            return CheckboxStatus.checked;
          case item.canExpand &&
            !!childIds.find((id) => selectedIds.includes(id)):
            return CheckboxStatus.indeterminate;
          default:
            return CheckboxStatus.nochecked;
        }
      },
      getItemAllCheckStatus() {
        switch (true) {
          case selectedIds.length >= canSelectedAllItemIds.length:
            return CheckboxStatus.checked;
          case !!selectedIds.length:
            return CheckboxStatus.indeterminate;
          default:
            return CheckboxStatus.nochecked;
        }
      },
      onSelectItem: (item: ItemType<T>) => {
        return mode === 'single'
          ? onSelectSingleItem(item)
          : onSelectMultipleItem(item);
      },
      onSelectItemAll: () => {
        let newIds: ID[] = [];
        if (selectedIds.length !== canSelectedAllItemIds.length) {
          newIds = canSelectedAllItemIds;
        }

        onSelectItemIds ? onSelectItemIds(newIds) : setSelectedIds(newIds);
      },
    }),
    [
      mode,
      canSelectedAllItemIds,
      selectedIds,
      collectChildIds,
      onSelectItemIds,
      onSelectSingleItem,
      onSelectMultipleItem,
    ],
  );
};
