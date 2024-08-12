import type { Meta, StoryObj } from '@storybook/react';

import { MillerColumns } from './miller-columns';
import { defaultData } from './mock/default';

const meta: Meta<typeof MillerColumns> = {
  title: 'MillerColumns',
  component: MillerColumns,
};

export default meta;
type Story = StoryObj<typeof MillerColumns>;

export const Default: Story = {
  args: {
    data: defaultData,
  },
};
