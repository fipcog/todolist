import type { Meta, StoryObj } from '@storybook/react';
import  { action } from '@storybook/addon-actions';
import { Button } from './Button';


const meta: Meta<typeof Button> = {
    title: 'Todolist/Button',
    component: Button,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        callback: {
            action: 'clicked'
        }
    }
};

export default meta;
type Story = StoryObj<typeof Button>;

export const ButtonStory: Story = {
    args: {
        children: 'Casual button'
    }
};
export const ButtonActiveStory: Story = {
    args: {
        children: 'Active button',
        className: 'active'
    }
};
