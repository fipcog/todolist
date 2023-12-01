import type { Meta, StoryObj } from '@storybook/react';
import  { action } from '@storybook/addon-actions';
import { TodoListCard } from './TodoListCard';
import { storeProviderDecorator } from '../../store/storybookDecoratorStore';
import { useSelector } from 'react-redux';
import { AppRootStateType } from '../../store/store';
import { TodolistType } from '../../App';


const meta: Meta<typeof TodoListCard> = {
    title: 'Todolist/TodoListCard',
    component: TodoListCard,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    decorators: [storeProviderDecorator]
};

export default meta;
type Story = StoryObj<typeof TodoListCard>;

const ServiceTodolistComponent = () => {
    let TDList = useSelector<AppRootStateType, TodolistType>((state=> state.todolists[0]))
    if(!TDList) TDList = {id:'todolistID1', title: 'What to learn', filter: 'all'}
    return <TodoListCard todolistID={TDList.id} title={TDList.title} tdFilter={TDList.filter}/>
}

export const TodoListCardStory: Story = {
    render: () => <ServiceTodolistComponent/>
};


