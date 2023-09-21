import type { Meta, StoryObj } from '@storybook/react';

import { MCCheckboxStatus } from '../src/types';
import { Checkbox as Component } from '../src/components';

const meta: Meta<typeof Component> = {
  title: 'Component/Checkbox',
  component: Component,
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Checkbox: Story = {
  args: {
    status: MCCheckboxStatus.unchecked,
    children: 'Checkbox',
  },
};
