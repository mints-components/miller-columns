import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import type { IDType, RequestResType, DataType } from './types';
import { MillerColumns } from './miller-columns';
import { defaultData, data1, data2, data11, data14 } from './mock';

const meta: Meta<typeof MillerColumns> = {
  title: 'MillerColumns',
  component: MillerColumns,
};

export default meta;
type Story = StoryObj<typeof MillerColumns>;

const request = async (id?: IDType, params?: any): Promise<RequestResType> => {
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

export const SelectableWithAll: Story = {
  args: {},
  render: () => {
    const [selectedIds, setSelectedIds] = useState<(string | number)[]>([]);

    const customRequest = async (): Promise<RequestResType> => {
      return new Promise((r) => {
        setTimeout(() => {
          r({
            data: data14.map((it) => ({
              ...it,
              parentId: null,
            })),
            hasMore: false,
          });
        }, 3000);
      });
    };

    return (
      <div style={{ width: 600 }}>
        <p>selected ids: {selectedIds.join(',')}</p>
        <MillerColumns
          request={customRequest}
          columnHeight={130}
          selectable
          selectedIds={selectedIds}
          onSelectedIds={setSelectedIds}
        />
      </div>
    );
  },
};

export const SingleSelectable: Story = {
  args: {},
  render: () => {
    const [selectedIds, setSelectedIds] = useState<(string | number)[]>([]);

    return (
      <div style={{ width: 600 }}>
        <p>selected id: {selectedIds.join(',')}</p>
        <MillerColumns
          request={request}
          columnHeight={130}
          selectable
          mode="single"
          disabledIds={[4]}
          selectedIds={selectedIds}
          onSelectedIds={setSelectedIds}
        />
      </div>
    );
  },
};

export const CustomTheme: Story = {
  args: {},
  render: () => {
    return (
      <div style={{ width: 600 }}>
        <MillerColumns
          request={request}
          columnHeight={130}
          selectable
          theme={{
            colorPrimary: '#ff0000',
          }}
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
          renderEnd={() => {
            return <span style={{ color: 'blue' }}>End...</span>;
          }}
          renderLoading={() => {
            return <span style={{ color: 'green' }}>Custom Loading...</span>;
          }}
        />
      </div>
    );
  },
};

export const RequestError: Story = {
  args: {},
  render: () => {
    const customRequest = async (): Promise<RequestResType> => {
      return new Promise((r) => {
        let data: DataType[] = [];
        let hasMore = false;
        let error = null;

        try {
          throw new Error('Request Error');
        } catch (e: any) {
          error = {
            message: e.message,
          };
        }

        setTimeout(() => {
          r({
            data,
            hasMore,
            error,
          });
        }, 3000);
      });
    };

    return (
      <div style={{ width: 600 }}>
        <MillerColumns request={customRequest} columnHeight={130} />
      </div>
    );
  },
};
