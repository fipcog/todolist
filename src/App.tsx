import React, { useCallback, useEffect } from 'react';
import './App.css';
import { TodoListCard } from './components/todolistkard/TodoListCard';
import { AddItemInput } from './components/additeminput/AddItemInput';
import { TodolistCompletedType, createNewTodolistTC, setTodolistsTC } from './reducers/todolistReducer';
import { useSelector } from 'react-redux';
import { AppRootStateType, useAppDispatch } from './store/store';
import { useDispatch } from 'react-redux';
import { TaskType } from './API/todolistAPI';


export type FilterType = 'all' | 'active' | 'completed'



export type TasksType = {
    [key: string]: TaskType[]
}

export const App: React.FC = () => {

    const todolists = useSelector<AppRootStateType, TodolistCompletedType[]>((state) => state.todolists)
    const dispatch = useAppDispatch()

    useEffect(()=> {
        dispatch(setTodolistsTC())
    } ,[])

    const createNewTodoList = useCallback((title: string): void => {
        dispatch(createNewTodolistTC(title))
    }, [dispatch])

    return (
        <div className='board'>
            <div className='add_todo_wrapper'>
                <AddItemInput callback={createNewTodoList} className='task_input'/>
            </div>
        {
            todolists.map(tdList => {
                return (
                    <TodoListCard   
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
