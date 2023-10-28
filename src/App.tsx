import React, { useReducer, useState } from 'react';
import './App.css';
import { TodoListKard, TaskType } from './components/todolistkard/TodoListKard';
import { AddItemInput } from './components/additeminput/AddItemInput';
import { changeTodolistTitleAC, createNewTodolistAC, removeTodolistAC, todolistReducer } from './reducers/todolistReducer';
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

    // const [todolists, setTodolists] = useState<TodolistType[]>([
    //     {id:todolistID1, title: 'What to learn', filter: 'all'},
    //     {id:todolistID2, title: 'What to buy', filter: 'all'},
    // ])

    const [todolists, dispatchTodolists] = useReducer(todolistReducer, [
        {id:todolistID1, title: 'What to learn', filter: 'all'},
        {id:todolistID2, title: 'What to buy', filter: 'all'},
    ])

    // const [tasks, setTasks] = useState<TasksType>({
    //     [todolistID1]:[
    //         {id: crypto.randomUUID(), title: "HTML&CSS", isDone: true},
    //         {id: crypto.randomUUID(), title: "JS", isDone: true},
    //         {id: crypto.randomUUID(), title: "ReactJS", isDone: false},
    //         {id: crypto.randomUUID(), title: "Rest API", isDone: false},
    //         {id: crypto.randomUUID(), title: "GraphQL", isDone: false},
    //     ],
    //     [todolistID2]:[
    //         {id: crypto.randomUUID(), title: "HTML&CSS2", isDone: true},
    //         {id: crypto.randomUUID(), title: "JS2", isDone: true},
    //         {id: crypto.randomUUID(), title: "ReactJS2", isDone: false},
    //         {id: crypto.randomUUID(), title: "Rest API2", isDone: false},
    //         {id: crypto.randomUUID(), title: "GraphQL2", isDone: false},
    //     ]
    // });

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
        // setTasks({...tasks, [todolistID]: [...tasks[todolistID].map(task => task.id === taskID ? {...task, isDone: !task.isDone}: task)]})
        dispatchTasks(toggleIsCheckedAC(todolistID, taskID))
    }

    const removeTask = (todolistID: string , taskID: string): void => {
        // setTasks({...tasks, [todolistID]: [...tasks[todolistID].filter(task => task.id !== taskID)]})
        dispatchTasks(removeTaskAC(todolistID, taskID))
    }

    const addTask = (todolistID: string, taskName: string): void => {
        // setTasks({...tasks, [todolistID]: [{id:crypto.randomUUID(), title: taskName, isDone: false}, ...tasks[todolistID]]})
        dispatchTasks(addTaskAC(todolistID, taskName))
    }

    const removeTodolist = (todolistID: string): void => {
        // setTodolists(todolists.filter(tdList => tdList.id !== todolistID))
        dispatchTodolists(removeTodolistAC(todolistID))
        delete tasks[todolistID]
    }

    const createNewTodoList = (title: string): void => {
        const NewTodolistID: string = crypto.randomUUID()
        const newTodo: TodolistType = {id: NewTodolistID, title, filter: 'all'}
        dispatchTodolists(createNewTodolistAC(newTodo))
        dispatchTasks(addNewEmptyTasksList(NewTodolistID))
        // setTodolists([...todolists, newTodo])
        // setTasks({...tasks, [todoID]: []})
    }

    const changeTaskTitle = (todolistID: string, taskID: string ,taskTitle: string): void => {
        // setTasks({...tasks, [todolistID]: tasks[todolistID].map(task => task.id === taskID ? {...task, title: taskTitle} : task)})
        dispatchTasks(changeTaskTitleAC(todolistID, taskID, taskTitle))
    }

    const changeTodolistTitle = (todolistID: string, todoTitle: string): void => {
        // setTodolists(todolists.map(todo => todo.id === todolistID ? {...todo, title: todoTitle} : todo))
        dispatchTodolists(changeTodolistTitleAC(todolistID, todoTitle))
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
                        title = {tdList.title} 
                        tasks = {tasks[tdList.id]} 
                        removeTask = {removeTask} 
                        addTask = {addTask}
                        toggleIsChecked = {toggleIsChecked}
                        removeTodolist = {removeTodolist}
                        changeTaskTitle={changeTaskTitle}
                        changeTodolistTitle={changeTodolistTitle}
                    />
                )
            })
        }
        </div>
    );
}
