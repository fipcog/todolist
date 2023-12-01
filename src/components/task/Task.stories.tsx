import type { Meta, StoryObj } from '@storybook/react';
import  { action } from '@storybook/addon-actions';
import { Task } from './Task';
import { useSelector } from 'react-redux';
import { TaskType } from '../todolistkard/TodoListCard';
import { AppRootStateType } from '../../store/store';
import { storeProviderDecorator } from '../../store/storybookDecoratorStore';

const meta: Meta<typeof Task> = {
    title: 'Todolist/Task',
    component: Task,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    decorators: [storeProviderDecorator]
};

export default meta;
type Story = StoryObj<typeof Task>;

const ServiceTaskComponent = () => {
    let task = useSelector<AppRootStateType, TaskType>((state => state.tasks['todolistID1'][0]))
    if(!task) task = {id: '0', title: "HTML&CSS", isDone: true}
    return <Task todolistID={'todolistID1'} task={task}/>
}

export const TaskStory: Story = {
    render: ()=> <ServiceTaskComponent/>
};


