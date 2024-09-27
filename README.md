**Please be aware that this component has been significantly updated in version 2.0. You can access the 1.0 release [here](https://github.com/mints-components/miller-columns/tree/release-v1). Bug fixes for version 1.0 will continue to be maintained..**

<h1 align="center">Miller Columns</h1>

<div align="center">

[![NPM version](https://img.shields.io/npm/v/%40mints%2Fmiller-columns?style=flat-square)](https://www.npmjs.com/package/@mints/miller-columns)
[![GitHub issues](https://img.shields.io/github/issues/mints-components/miller-columns?style=flat-square)](https://github.com/mints-components/miller-columns/issues)
![LICENCE](https://img.shields.io/github/license/mints-components/miller-columns?style=flat-square)

</div>

> Miller Columns Component based on MUI.

## Features

- Easy to use, and only one required prop.
- Implement scrolling loading data on a column by [react-infinite-scroll-component](https://github.com/ankeetmaini/react-infinite-scroll-component).
- Written in **TypeScript** to achieve good type support.

## Installation

```
# Yarn
$ yarn add @mints/miller-columns

# Npm
$ npm install --save @mints/miller-columns
```

## Usage

```javascript
import { MillerColumns } from '@mints/miller-columns';

const request = () => {
  return {
    data: [],
    hasMore: false,
  };
};

export const TestComponent = () => {
  return <MillerColumns request={request} />;
};
```

## Props

| Prop          | Type                                                     | Default    | Description                          |
| ------------- | -------------------------------------------------------- | ---------- | ------------------------------------ |
| request       | `(id?: IDType, params?: any) => Promise<RequestResType>` |            | Asynchronous method for getting data |
| rootId        | `IDType`                                                 |            | Parameters of the first request      |
| loading       | `boolean`                                                | true       | Cooperate with `items` control       |
| items         | `DataType[]`                                             |            | item used to display in columns      |
| style         | `React.CSSProperties`                                    |            |                                      |
| bordered      | `boolean`                                                | false      |                                      |
| theme         | `{ colorPrimary?: string; borderColor?: string; }`       |            |                                      |
| columnCount   | `number`                                                 | 3          | columns to display in a container    |
| columnHeight  | `number`                                                 |            | columns height (control scrolling)   |
| renderTitle   | `(id: IDType) => React.ReactNode`                        |            | display column title                 |
| renderEnd     | `(id: IDType) => React.ReactNode`                        |            | display column end                   |
| renderLoading | `(id: IDType) => React.ReactNode`                        |            | display column loading               |
| renderError   | `(errMsg: string) => React.ReactNode`                    |            | display column error                 |
| renderNoData  | `(id: IDType) => React.ReactNode`                        |            | display column no data               |
| selectable    | `boolean`                                                | false      |                                      |
| mode          | `single` or `multiple`                                   | `multiple` | Single select or multiple select     |
| disabledIds   | `IDType[]`                                               |            | disabled ids                         |
| selectedIds   | `IDType[]`                                               |            | selected ids                         |
| onSelectedIds | `(ids: IDType[], data?: any[]) => void`                  |            | set selected ids                     |

## Start Example(Development)

```
$ yarn storybook
```

## LICENSE

[MIT](./LICENSE)
