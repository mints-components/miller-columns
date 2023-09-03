import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

import { MillerColumnsSelect } from '../src';

import { items } from './mock/expand';

const meta: Meta<typeof MillerColumnsSelect> = {
  title: 'Components/Expand',
  component: MillerColumnsSelect,
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Expand: Story = {
  render: () => (
    <div style={{ width: 600 }}>
      <MillerColumnsSelect
        items={items}
        getCanExpand={(it) => it.type === 'group'}
      />
    </div>
  ),
};
