import type { Meta, StoryObj } from '@storybook/react';

import type { RequestResType, DataType } from './types';
import { MillerColumns } from './miller-columns';
import { defaultData, data1, data2, data11 } from './mock';

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
  console.log(id, params);

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
        <MillerColumns request={request} />
      </div>
    );
  },
};
