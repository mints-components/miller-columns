import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

import { MillerColumnsSelect } from '../src';

import { items } from './mock/basic';

const meta: Meta<typeof MillerColumnsSelect> = {
  title: 'Components/Basic',
  component: MillerColumnsSelect,
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: () => (
    <div style={{ width: 600 }}>
      <MillerColumnsSelect items={items} />
    </div>
  ),
};
