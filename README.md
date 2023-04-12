# Miller Columns Select

Miller Columns Select is a controlled form component by React.

## Features

- A flat data structure makes usage simple.
- Support for loading data asynchronously.
- Implement scrolling loading data on a column by **react-infinite-scroll-component**.
- The complete example helps you easily implement a demo.
- Good **TypeScript** support.

## Installation

```
# Yarn
$ yarn add miller-columns-select

# Npm
$ npm install --save miller-columns-select
```

## Screenshots

![Basic Component](https://raw.githubusercontent.com/mintsweet/miller-columns-select/master/screenshots/basic-component.png)

![Async Component](https://raw.githubusercontent.com/mintsweet/miller-columns-select/master/screenshots/async-component.png)

## Usage

```typescript
import { useState } from 'react';
import type { ID, ItemType } from 'miller-columns-select';
import MillerColumnsSelect from 'miller-columns-select';

enum TypeEnum {
  folder = 'folder'
  file = 'file'
}

const items: ItemType<{ type: TypeEnum}>[] = [
  [
  {
    parentId: null,
    id: '1',
    title: '1',
    type: TypeEnum.folder,
  },
  {
    parentId: '1',
    id: '1-1',
    title: '1-1',
    type: TypeEnum.file,
  },
  {
    parentId: '1',
    id: '1-2',
    title: '1-2',
    type: TypeEnum.file,
  },
];
]

export const Example = () => {
  const [selectedIds, setSelectedIds] = useState<ID[]>([]);

  return (
    <MillerColumns
      items={items}
      getCanExpand={(item) => item.type === TypeEnum.folder}
      selectedIds={selectedIds}
      onSelectItemIds={(ids) => setSelectedIds(ids)}
    />
  );
};
```

## Props

| Prop            | Type                                        | Default     | Description                                |
| --------------- | ------------------------------------------- | ----------- | ------------------------------------------ |
| items\*         | `McsItem<T>[]`                              |             | item used to display in columns            |
| getCanExpand    | `(id: McsID) => boolean`                    |             | distinguish whether item can be expanded   |
| getHasMore      | `(id: McsID\|null) => boolean`              | () => false | determine whether the column has more data |
| onExpandItem    | `(item: McsItem<T>) => void`                |             | when item expand will call                 |
| onScrollColumn  | `(column: ColumnType) => void`              |             | when column scroll will call               |
| columnCount     | number                                      | 3           | columns to display in a container          |
| columnHeight    | number                                      |             | columns height (control scrolling)         |
| renderTitle     | `(column: McsColumn) => React.ReactNode`    |             | display column title                       |
| renderEnd       | `(column: McsColumn) => React.ReactNode`    |             | display column end                         |
| renderLoading   | `(column: McsColumn) => React.ReactNode`    |             | display column loading                     |
| renderHeader    | `(columns: McsColumn[]) => React.ReactNode` |             | display container header                   |
| renderFooter    | `(columns: McsColumn[]) => React.ReactNode` |             | display container footer                   |
| disabledIds     | `McsID[]`                                   |             | disabled ids                               |
| selectedIds     | `McsID[]`                                   | `[]`        | selected ids                               |
| onSelectItemIds | `(selectedIds: McsID[]) => void`            |             | set selected ids                           |

## Start Example(Development)

```bash
$ yarn
$ yarn start
```

## License

[MIT](https://github.com/mintsweet/miller-columns-select/blob/master/LICENSE)
