import React, { useCallback, useEffect } from 'react';
import './todolistStyles.scss';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { BrowserRouter, Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom';
import { TaskType } from '../../API/todolistAPI';
import { AppRootStateType, useAppDispatch } from '../../store/store';
import { RequestStatusType, logOutTC } from '../../reducers/appReducer';
import { TodolistCompletedType, createNewTodolistTC, setTodolistsTC } from '../../reducers/todolistReducer';
import { AddItemInput } from '../additeminput/AddItemInput';
import { Preloader } from '../preloader/Preloader';
import { TodoListCard } from '../todolistkard/TodoListCard';
import { ErrorSnackbar } from '../errorSnackbar/ErrorSnackbar';
import { Button } from '../button/Button';



export type FilterType = 'all' | 'active' | 'completed'



export type TasksType = {
    [key: string]: TaskType[]
}

export const Todolists: React.FC = () => {

    const appStatus = useSelector<AppRootStateType, RequestStatusType>(state => state.app.status)
    const todolists = useSelector<AppRootStateType, TodolistCompletedType[]>((state) => state.todolists)
    const isLogged = useSelector<AppRootStateType, boolean>(state => state.app.isLogged)
    const dispatch = useAppDispatch()

    useEffect(()=> {
        dispatch(setTodolistsTC())
    } ,[])

    const createNewTodoList = useCallback((title: string): void => {
        dispatch(createNewTodolistTC(title))
    }, [dispatch])

    const logOut = () => {
        dispatch(logOutTC())
    }

    if(!isLogged) {
        return <Navigate to={'/login'} />
    }

    return (
        <div className='board'>
            <Button className='logOutBtn' onClick={logOut}>LogOut</Button>
            <div className='add_todo_wrapper'>
                <AddItemInput callback={createNewTodoList} className='task_input'/>
            </div>
            {appStatus === 'loading' && <Preloader/>}
        {
            todolists.map(tdList => {
                return (
                    <TodoListCard   
                        key = {tdList.id}
                        todolistID = {tdList.id}
                        tdFilter = {tdList.filter}
                        title = {tdList.title} 
                        status = {tdList.status}
                    />
                )
            })
        }
        </div>
    );
}
