import React, { useState } from 'react';
import './App.css';
import { TodoListKard, TaskType } from './components/todolistkard/TodoListKard';
import { AddItemInput } from './components/additeminput/AddItemInput';

export type FilterType = 'all' | 'active' | 'completed'

export type TodolistsType = {
    id: string
    title: string
    filter: FilterType
}

type TasksType = {
    [key: string]: TaskType[]
}

export const App: React.FC = () => {

    const todolistID1=crypto.randomUUID();
    const todolistID2=crypto.randomUUID();

    const [todolists, setTodolists] = useState<TodolistsType[]>([
        {id:todolistID1, title: 'What to learn', filter: 'all'},
        {id:todolistID2, title: 'What to buy', filter: 'all'},
    ])

    const [tasks, setTasks] = useState<TasksType>({
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
        setTasks({...tasks, [todolistID]: [...tasks[todolistID].map(task => task.id === taskID ? {...task, isDone: !task.isDone}: task)]})
    }

    const removeTask = (todolistID: string , taskID: string): void => {
        setTasks({...tasks, [todolistID]: [...tasks[todolistID].filter(task => task.id !== taskID)]})
    }

    const addTask = (todolistID: string, taskName: string): void => {
        setTasks({...tasks, [todolistID]: [{id:crypto.randomUUID(), title: taskName, isDone: false}, ...tasks[todolistID]]})
    }

    const removeTodolist = (todolistID: string): void => {
        setTodolists(todolists.filter(tdList => tdList.id !== todolistID))
        delete tasks[todolistID]
    }

    const createNewTodoList = (title: string): void => {
        const todoID: string = crypto.randomUUID()
        const newTodo: TodolistsType = {id: todoID, title, filter: 'all'}
        setTodolists([...todolists, newTodo])
        setTasks({...tasks, [todoID]: []})
    }

    const changeTaskTitle = (todolistID: string, taskID: string ,taskTitle: string): void => {
        setTasks({...tasks, [todolistID]: tasks[todolistID].map(task => task.id === taskID ? {...task, title: taskTitle} : task)})
    }

    const changeTodolistTitle = (todolistID: string, todoTitle: string): void => {
        setTodolists(todolists.map(todo => todo.id === todolistID ? {...todo, title: todoTitle} : todo))
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
