import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

import { MillerColumnsSelect } from '../src';

import { items } from './mock/example';

const meta: Meta<typeof MillerColumnsSelect> = {
  title: 'Components/Example',
  component: MillerColumnsSelect,
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Example: Story = {
  render: () => (
    <div style={{ width: 600 }}>
      <MillerColumnsSelect items={items} />
    </div>
  ),
};
