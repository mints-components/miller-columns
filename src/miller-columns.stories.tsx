import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import type { RequestResType, DataType } from './types';
import { MillerColumns } from './miller-columns';
import { defaultData, data1, data2, data11, data14 } from './mock';

const meta: Meta<typeof MillerColumns> = {
  title: 'MillerColumns',
  component: MillerColumns,
};

export default meta;
type Story = StoryObj<typeof MillerColumns>;

const request = async (
  id?: string | number,
  params?: any,
): Promise<RequestResType> => {
  let data: DataType[] = defaultData;
  let hasMore = false;

  if (id === 1 && !params) {
    data = data1;
    hasMore = true;
  }

  if (id === 1 && params?.page === 2) {
    data = data2;
    hasMore = false;
  }

  if (id === '1-1') {
    data = data11;
  }

  if (id === '1-4') {
    data = data14;
  }

  return new Promise((r) => {
    setTimeout(() => {
      r({
        data,
        hasMore,
        params: {
          page: 2,
        },
      });
    }, 3000);
  });
};

export const Default: Story = {
  args: {},
  render: () => {
    return (
      <div style={{ width: 600 }}>
        <MillerColumns request={request} columnHeight={130} />
      </div>
    );
  },
};

export const Selectable: Story = {
  args: {},
  render: () => {
    const [selectedIds, setSelectedIds] = useState<(string | number)[]>([]);

    return (
      <div style={{ width: 600 }}>
        <p>selected ids: {selectedIds.join(',')}</p>
        <MillerColumns
          request={request}
          columnHeight={130}
          selectable
          selectedIds={selectedIds}
          onSelectedIds={setSelectedIds}
        />
      </div>
    );
  },
};

export const CustomRender: Story = {
  args: {},
  render: () => {
    return (
      <div style={{ width: 600 }}>
        <MillerColumns
          request={request}
          columnHeight={130}
          renderTitle={(id) => {
            return id ? null : (
              <span style={{ color: 'red' }}>This is a custom title</span>
            );
          }}
          renderEnd={(id) => {
            return <span style={{ color: 'blue' }}>End...</span>;
          }}
          renderLoading={(id) => {
            return <span style={{ color: 'green' }}>Loading...</span>;
          }}
        />
      </div>
    );
  },
};
