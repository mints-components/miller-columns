import { useState } from 'react';
import { Switch, ButtonGroup, Button, Intent } from '@blueprintjs/core';
import MillerColumnsSelect from 'miller-columns-select';

import { mockData } from './mock';
import { TypeEnum, TestItemType, TestColumnType } from './types';

const ColumnCount = [1, 2, 3, 4, 5];
const ColumnHeight = [undefined, 200, 400, 600];

export const BasicMillerColumnsSelect = () => {
  const [selectedIds, setSelectedIds] = useState<TestItemType['id'][]>([]);
  const [disabledIds, setDisabledIds] = useState<TestItemType['id'][]>([]);
  const [columnCount, setColumnCount] = useState(3);
  const [columnHeight, setColumnHeight] = useState<number | undefined>(400);
  const [showRenderTitle, setShowRenderTitle] = useState(false);
  const [showRenderEnd, setShowRenderEnd] = useState(false);
  const [showRenderHeader, setShowRenderHeader] = useState(false);
  const [showRenderFooter, setShowRenderFooter] = useState(false);
  const [showRenderLoading, setShowRenderLoading] = useState(false);

  const renderTitle = (column: TestColumnType) => {
    if (!showRenderTitle) {
      return null;
    }

    return (
      <div style={{ padding: '6px 10px' }}>
        renderTitle: {column.parentTitle}
      </div>
    );
  };

  const renderEnd = (column: TestColumnType) => {
    if (!showRenderEnd) {
      return null;
    }

    return (
      <div style={{ padding: '6px 10px' }}>renderEnd: {column.parentTitle}</div>
    );
  };

  const renderHeader = (columns: TestColumnType[]) => {
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

  const renderFooter = (columns: TestColumnType[]) => {
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

  const handleExpandItem = (item: TestItemType) => {
    console.log(item);
  };

  return (
    <div className="component">
      <div className="props">
        <h3>Props</h3>
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
                key={i}
                text={height ?? 'unset'}
                intent={columnHeight === height ? Intent.PRIMARY : Intent.NONE}
                onClick={() => setColumnHeight(height)}
              />
            ))}
          </ButtonGroup>
        </div>
        <Switch
          label="disabledIds(id: 3)"
          checked={!!disabledIds.length}
          onChange={(e) =>
            (e.target as HTMLInputElement).checked
              ? setDisabledIds(['3'])
              : setDisabledIds([])
          }
        />
        <Switch
          label="renderTitle"
          checked={showRenderTitle}
          onChange={(e) =>
            setShowRenderTitle((e.target as HTMLInputElement).checked)
          }
        />
        <Switch
          label="renderEnd"
          checked={showRenderEnd}
          onChange={(e) =>
            setShowRenderEnd((e.target as HTMLInputElement).checked)
          }
        />
        <Switch
          label="renderHeader"
          checked={showRenderHeader}
          onChange={(e) =>
            setShowRenderHeader((e.target as HTMLInputElement).checked)
          }
        />
        <Switch
          label="renderFooter"
          checked={showRenderFooter}
          onChange={(e) =>
            setShowRenderFooter((e.target as HTMLInputElement).checked)
          }
        />
        <Switch
          label="renderLoading"
          checked={showRenderLoading}
          onChange={(e) =>
            setShowRenderLoading((e.target as HTMLInputElement).checked)
          }
        />
        <div>
          <span>Select Ids: </span>
          <span>{JSON.stringify(selectedIds)}</span>
        </div>
      </div>
      <div className="content">
        <MillerColumnsSelect
          columnCount={columnCount}
          columnHeight={columnHeight}
          getCanExpand={(item) => item.type === TypeEnum.folder}
          renderTitle={renderTitle}
          renderEnd={renderEnd}
          renderHeader={renderHeader}
          renderFooter={renderFooter}
          renderLoading={renderLoading}
          items={mockData}
          selectedIds={selectedIds}
          disabledIds={disabledIds}
          onSelectItemIds={(ids) => setSelectedIds(ids)}
          onExpandItem={handleExpandItem}
        />
      </div>
    </div>
  );
};
