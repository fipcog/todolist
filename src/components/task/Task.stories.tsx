import type { Meta, StoryObj } from '@storybook/react';
import  { action } from '@storybook/addon-actions';
import { Task } from './Task';
import { useSelector } from 'react-redux';
import { AppRootStateType } from '../../store/store';
import { storeProviderDecorator } from '../../store/storybookDecoratorStore';
import { TaskType } from '../../API/todolistAPI';

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
    if(!task) task = {
        "id": "63211302-16c2-4a30-a2b1-50c249239825",
        "title": "NewTask",
        "description": '',
        "todoListId": "f7043da4-1fdb-4e7d-9987-a3e2916a1fb5",
        "order": 0,
        "status": 0,
        "priority": 1,
        "startDate": '',
        "deadline": '',
        "addedDate": "2023-12-17T13:07:10.39"
    }
    return <Task todolistID={'todolistID1'} task={task}/>
}

export const TaskStory: Story = {
    render: ()=> <ServiceTaskComponent/>
};


