import React, { useReducer } from 'react';
import './App.css';
import { TodoListKard, TaskType } from './components/todolistkard/TodoListKard';
import { AddItemInput } from './components/additeminput/AddItemInput';
import { changeTodolistFilterAC, changeTodolistTitleAC, createNewTodolistAC, removeTodolistAC, todolistReducer } from './reducers/todolistReducer';
import { addNewEmptyTasksList, addTaskAC, changeTaskTitleAC, removeTaskAC, tasksReducer, toggleIsCheckedAC } from './reducers/taskReducer';

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

    const todolistID1=crypto.randomUUID();
    const todolistID2=crypto.randomUUID();

    const [todolists, dispatchTodolists] = useReducer(todolistReducer, [
        {id:todolistID1, title: 'What to learn', filter: 'all'},
        {id:todolistID2, title: 'What to buy', filter: 'all'},
    ])

    const [tasks, dispatchTasks] = useReducer(tasksReducer, {
        [todolistID1]:[
            {id: crypto.randomUUID(), title: "HTML&CSS", isDone: true},
            {id: crypto.randomUUID(), title: "JS", isDone: true},
            {id: crypto.randomUUID(), title: "ReactJS", isDone: false},
            {id: crypto.randomUUID(), title: "Rest API", isDone: false},
            {id: crypto.randomUUID(), title: "GraphQL", isDone: false},
        ],
        [todolistID2]:[
            {id: crypto.randomUUID(), title: "HTML&CSS2", isDone: true},
            {id: crypto.randomUUID(), title: "JS2", isDone: true},
            {id: crypto.randomUUID(), title: "ReactJS2", isDone: false},
            {id: crypto.randomUUID(), title: "Rest API2", isDone: false},
            {id: crypto.randomUUID(), title: "GraphQL2", isDone: false},
        ]
    });

    const toggleIsChecked = (todolistID: string, taskID: string): void => {
        dispatchTasks(toggleIsCheckedAC(todolistID, taskID))
    }

    const removeTask = (todolistID: string , taskID: string): void => {
        dispatchTasks(removeTaskAC(todolistID, taskID))
    }

    const addTask = (todolistID: string, taskName: string): void => {
        dispatchTasks(addTaskAC(todolistID, taskName))
    }

    const removeTodolist = (todolistID: string): void => {
        dispatchTodolists(removeTodolistAC(todolistID))
        delete tasks[todolistID]
    }

    const createNewTodoList = (title: string): void => {
        const NewTodolistID: string = crypto.randomUUID()
        const newTodo: TodolistType = {id: NewTodolistID, title, filter: 'all'}
        dispatchTodolists(createNewTodolistAC(newTodo))
        dispatchTasks(addNewEmptyTasksList(NewTodolistID))
    }

    const changeTaskTitle = (todolistID: string, taskID: string ,taskTitle: string): void => {
        dispatchTasks(changeTaskTitleAC(todolistID, taskID, taskTitle))
    }

    const changeTodolistTitle = (todolistID: string, todoTitle: string): void => {
        dispatchTodolists(changeTodolistTitleAC(todolistID, todoTitle))
    }

    const changeTodolistFilter = (todolistID: string, newFilter: FilterType): void => {
        dispatchTodolists(changeTodolistFilterAC(todolistID, newFilter))
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
                        tasks = {tasks[tdList.id]} 
                        removeTask = {removeTask} 
                        addTask = {addTask}
                        toggleIsChecked = {toggleIsChecked}
                        removeTodolist = {removeTodolist}
                        changeTaskTitle = {changeTaskTitle}
                        changeTodolistTitle = {changeTodolistTitle}
                        changeTodolistFilter = {changeTodolistFilter}
                    />
                )
            })
        }
        </div>
    );
}
