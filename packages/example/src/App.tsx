import { useState } from 'react';
import {
  Switch,
  ButtonGroup,
  Button,
  RadioGroup,
  Radio,
  Intent,
} from '@blueprintjs/core';
import type { ItemType, ColumnType } from 'miller-columns-select';

import type { ExtraItemType } from './types';
import { TypeEnum } from './types';
import { BasicMillerColumnsSelect } from './basic-component';
import { AsyncMillerColumnsSelect } from './async-component';

const ColumnCount = [1, 2, 3, 4, 5];
const ColumnHeight = [undefined, 200, 400, 600];
const DisabledIds = [[], ['3'], ['2', '5'], ['3', '4', '6']];

function App() {
  const [selectedIds, setSelectedIds] = useState<
    ItemType<ExtraItemType>['id'][]
  >([]);
  const [disabledIds, setDisabledIds] = useState<
    ItemType<ExtraItemType>['id'][]
  >([]);
  const [columnCount, setColumnCount] = useState(3);
  const [columnHeight, setColumnHeight] = useState<number | undefined>(400);
  const [showRenderTitle, setShowRenderTitle] = useState(false);
  const [showRenderEnd, setShowRenderEnd] = useState(false);
  const [showRenderHeader, setShowRenderHeader] = useState(false);
  const [showRenderFooter, setShowRenderFooter] = useState(false);
  const [showRenderLoading, setShowRenderLoading] = useState(false);
  const [mode, setModa] = useState('basic');

  const renderTitle = (column: ColumnType<ExtraItemType>) => {
    if (!showRenderTitle) {
      return null;
    }

    return (
      <div style={{ padding: '6px 10px' }}>
        renderTitle: {column.parentTitle}
      </div>
    );
  };

  const renderEnd = (column: ColumnType<ExtraItemType>) => {
    if (!showRenderEnd) {
      return null;
    }

    return (
      <div style={{ padding: '6px 10px' }}>renderEnd: {column.parentTitle}</div>
    );
  };

  const renderHeader = (columns: ColumnType<ExtraItemType>[]) => {
    if (!showRenderHeader) {
      return null;
    }

    return (
      <ul className="column-header">
        {columns.map((col, i) => (
          <li key={col.parentId}>
            {i + 1} : {col.parentTitle}
          </li>
        ))}
      </ul>
    );
  };

  const renderFooter = (columns: ColumnType<ExtraItemType>[]) => {
    if (!showRenderFooter) {
      return null;
    }

    return (
      <ul className="column-footer">
        {columns.map((col, i) => (
          <li key={col.parentId}>
            {i + 1} : {col.parentTitle}
          </li>
        ))}
      </ul>
    );
  };

  const renderLoading = () => {
    if (!showRenderLoading) {
      return null;
    }

    return <span>Custom Loading...</span>;
  };

  const handleExpandItem = (item: ItemType<ExtraItemType>) => {
    console.log(item);
  };

  return (
    <div className="App">
      <div className="block">
        <h3>Props</h3>
      </div>
      <div className="block">
        <div className="item">
          <div style={{ marginBottom: 4 }}>Column Count</div>
          <ButtonGroup>
            {ColumnCount.map((count, i) => (
              <Button
                key={i}
                text={count}
                intent={columnCount === count ? Intent.PRIMARY : Intent.NONE}
                onClick={() => setColumnCount(count)}
              />
            ))}
          </ButtonGroup>
        </div>
        <div className="item">
          <div style={{ marginBottom: 4 }}>Column Height</div>
          <ButtonGroup>
            {ColumnHeight.map((height, i) => (
              <Button
                disabled={mode === 'async'}
                key={i}
                text={height ?? 'unset'}
                intent={columnHeight === height ? Intent.PRIMARY : Intent.NONE}
                onClick={() => setColumnHeight(height)}
              />
            ))}
          </ButtonGroup>
        </div>
        <div className="item">
          <div style={{ marginBottom: 4 }}>Disabled Ids</div>
          <ButtonGroup>
            {DisabledIds.map((ids, i) => (
              <Button
                key={i}
                text={!ids.length ? 'unset' : ids.join(',')}
                intent={
                  disabledIds.length === ids.length
                    ? Intent.PRIMARY
                    : Intent.NONE
                }
                onClick={() => setDisabledIds(ids)}
              />
            ))}
          </ButtonGroup>
        </div>
      </div>
      <div className="block">
        <div className="item">
          <Switch
            label="renderTitle"
            checked={showRenderTitle}
            onChange={(e) =>
              setShowRenderTitle((e.target as HTMLInputElement).checked)
            }
          />
        </div>
        <div className="item">
          <Switch
            label="renderEnd"
            checked={showRenderEnd}
            onChange={(e) =>
              setShowRenderEnd((e.target as HTMLInputElement).checked)
            }
          />
        </div>
        <div className="item">
          <Switch
            label="renderHeader"
            checked={showRenderHeader}
            onChange={(e) =>
              setShowRenderHeader((e.target as HTMLInputElement).checked)
            }
          />
        </div>
        <div className="item">
          <Switch
            label="renderFooter"
            checked={showRenderFooter}
            onChange={(e) =>
              setShowRenderFooter((e.target as HTMLInputElement).checked)
            }
          />
        </div>
        <div className="item">
          <Switch
            label="renderLoading"
            checked={showRenderLoading}
            onChange={(e) =>
              setShowRenderLoading((e.target as HTMLInputElement).checked)
            }
          />
        </div>
      </div>
      <div className="block">
        <Button
          small
          minimal
          outlined
          intent={Intent.PRIMARY}
          text="Clear"
          style={{ marginRight: 10 }}
          onClick={() => setSelectedIds([])}
        />
        <span>Select Ids: </span>
        <span>{JSON.stringify(selectedIds)}</span>
      </div>
      <div className="block">
        <h3>Change Mode</h3>
      </div>
      <div className="block">
        <RadioGroup
          inline
          onChange={(e) => setModa((e.target as HTMLInputElement).value)}
          selectedValue={mode}
        >
          <Radio label="Baisc Component" value="basic" />
          <Radio label="Async Component" value="async" />
        </RadioGroup>
      </div>
      {mode === 'basic' && (
        <div className="component">
          <h3>Basic Miller-Columns-Select</h3>
          <BasicMillerColumnsSelect
            style={{ marginTop: 12 }}
            columnCount={columnCount}
            columnHeight={columnHeight}
            getCanExpand={(item) => item.type === TypeEnum.folder}
            renderTitle={renderTitle}
            renderEnd={renderEnd}
            renderHeader={renderHeader}
            renderFooter={renderFooter}
            renderLoading={renderLoading}
            selectedIds={selectedIds}
            disabledIds={disabledIds}
            onSelectItemIds={(ids) => setSelectedIds(ids)}
            onExpandItem={handleExpandItem}
          />
        </div>
      )}
      {mode === 'async' && (
        <div className="component">
          <h3>Async Miller-Columns-Select</h3>
          <AsyncMillerColumnsSelect
            style={{ marginTop: 12 }}
            columnCount={columnCount}
            columnHeight={120}
            getCanExpand={(item) => item.type === TypeEnum.folder}
            renderTitle={renderTitle}
            renderEnd={renderEnd}
            renderHeader={renderHeader}
            renderFooter={renderFooter}
            renderLoading={renderLoading}
            selectedIds={selectedIds}
            disabledIds={disabledIds}
            onSelectItemIds={(ids) => setSelectedIds(ids)}
          />
        </div>
      )}
    </div>
  );
}

export default App;
