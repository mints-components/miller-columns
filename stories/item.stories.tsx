import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

import { MCItemStatus, MCCheckboxStatus } from '../src/types';
import { Item as Component } from '../src/components';

type ComponentPropsAndCustomArgs = React.ComponentProps<typeof Component> & {
  title: string;
  canExpand: boolean;
};

const meta: Meta<ComponentPropsAndCustomArgs> = {
  title: 'Component/Item',
  component: Component,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    item: {
      table: {
        disable: true,
      },
    },
  },
  render: ({ title, canExpand, ...args }) => {
    return <Component {...args} item={{ title, canExpand }} />;
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Item: Story = {
  args: {
    title: 'This is a title',
    canExpand: false,
    checkable: false,
    status: MCItemStatus.unselected,
    checkStatus: MCCheckboxStatus.unchecked,
  },
};
