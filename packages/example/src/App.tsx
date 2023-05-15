import { useState } from 'react';
import { Switch, ButtonGroup, Button, Intent } from '@blueprintjs/core';
import type { McsItem, McsColumn } from 'miller-columns-select';

import type { ExtraItemType } from './types';
import { MockComponent } from './component';

const ColumnCount = [1, 2, 3, 4, 5];

function App() {
  const [selectedIds, setSelectedIds] = useState<
    McsItem<ExtraItemType>['id'][]
  >([]);
  const [columnCount, setColumnCount] = useState(3);
  const [showSelectAll, setShowSelectAll] = useState(false);
  const [showRenderTitle, setShowRenderTitle] = useState(false);
  const [showRenderEnd, setShowRenderEnd] = useState(false);
  const [showRenderHeader, setShowRenderHeader] = useState(false);
  const [showRenderFooter, setShowRenderFooter] = useState(false);
  const [showRenderLoading, setShowRenderLoading] = useState(false);

  const renderTitle = (column: McsColumn) => {
    if (!showRenderTitle) {
      return null;
    }

    return (
      <div style={{ padding: '6px 10px' }}>
        renderTitle: {column.parentTitle}
      </div>
    );
  };

  const renderEnd = (column: McsColumn) => {
    if (!showRenderEnd) {
      return null;
    }

    return (
      <div style={{ padding: '6px 10px' }}>renderEnd: {column.parentTitle}</div>
    );
  };

  const renderHeader = (columns: McsColumn[]) => {
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

  const renderFooter = (columns: McsColumn[]) => {
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
      </div>
      <div className="block">
        <div className="item">
          <Switch
            label="renderSelectAll"
            checked={showSelectAll}
            onChange={(e) =>
              setShowSelectAll((e.target as HTMLInputElement).checked)
            }
          />
        </div>
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

      <div className="component">
        <h3>Miller-Columns-Select</h3>
        <MockComponent
          style={{ marginTop: 12 }}
          columnCount={columnCount}
          columnHeight={200}
          showSelectAll={showSelectAll}
          renderTitle={renderTitle}
          renderEnd={renderEnd}
          renderHeader={renderHeader}
          renderFooter={renderFooter}
          renderLoading={renderLoading}
          selectedIds={selectedIds}
          onSelectItemIds={(ids) => setSelectedIds(ids)}
        />
      </div>
    </div>
  );
}

export default App;
