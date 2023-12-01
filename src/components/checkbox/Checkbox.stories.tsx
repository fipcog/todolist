import type { Meta, StoryObj } from '@storybook/react';
import  { action } from '@storybook/addon-actions';
import { Checkbox } from './Checkbox';

const meta: Meta<typeof Checkbox> = {
    title: 'Todolist/Checkbox',
    component: Checkbox,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        callback: {
            action: 'clicked'
        }
    },
    args: {
        id: 'k2fmhgd'
    }
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

export const CheckboxStory: Story = {
    args: {
        checked: false
    }
};
export const CheckboxActiveStory: Story = {
    args: {
        checked: true
    }
};
