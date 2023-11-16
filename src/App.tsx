import React from 'react';
import './App.css';
import { TodoListKard, TaskType } from './components/todolistkard/TodoListKard';
import { AddItemInput } from './components/additeminput/AddItemInput';
import { createNewTodolistAC } from './reducers/todolistReducer';
import { useSelector } from 'react-redux';
import { AppRootStateType } from './store/store';
import { useDispatch } from 'react-redux';

export type FilterType = 'all' | 'active' | 'completed'

export type TodolistType = {
    id: string
    title: string
    filter: FilterType
}

export type TasksType = {
    [key: string]: TaskType[]
}

export const App: React.FC = () => {

    const todolists = useSelector<AppRootStateType, TodolistType[]>((state) => state.todolists)
    const dispatch = useDispatch()

    const createNewTodoList = (title: string): void => {
        dispatch(createNewTodolistAC(title))
    }

    return (
        <div className='board'>
            <div className='add_todo_wrapper'>
                <AddItemInput callback={createNewTodoList} className='task_input'/>
            </div>
        {
            todolists.map(tdList => {
                return (
                    <TodoListKard   
                        key = {tdList.id}
                        todolistID = {tdList.id}
                        tdFilter = {tdList.filter}
                        title = {tdList.title} 
                    />
                )
            })
        }
        </div>
    );
}
