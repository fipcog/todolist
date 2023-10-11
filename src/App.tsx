import React, { useState } from 'react';
import './App.css';
import { TodoListKard, TaskType } from './components/TodoListKard';

export type FilterType = 'all' | 'active' | 'completed'

export type TodolistsType = {
    id: string
    title: string
    filter: FilterType
}

type TasksType = {
    [key: string]: TaskType[]
}

function App() {

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

    const toggleIsChecked = (taskId: string) => {
        // const newArr: TaskType[] = tasks.map(item => {
        //     return item.id === taskId ? {...item, isChecked: !item.isChecked} : item
        // })
        // setTasks(newArr)
    }

    const removeTaskHandler = (id: string): void => {
        // const filteredTasks = tasks.filter(task => task.id !== id)
        // setTasks(filteredTasks)
    }

    const addTask = (taskName: string): void => {
        // setTasks([{id: crypto.randomUUID(), isChecked: false, name: taskName}, ...tasks])
    }

    // let filteredTasks: TasksType

    // switch (filter) {
    //     case 'active':
    //         filteredTasks = tasks.filter(task => !task.isChecked)
    //         break

    //     case 'completed':
    //         filteredTasks = tasks.filter(task => task.isChecked)
    //         break

    //     default:
    //         filteredTasks = tasks
    // }

    return (
        <>
        {
            todolists.map(tdlist => {
                return (
                    <TodoListKard   
                        key = {tdlist.id}
                        id = {tdlist.id}
                        title = {tdlist.title} 
                        tasks = {tasks[tdlist.id]} 
                        removeTaskHandler = {removeTaskHandler} 
                        addTask = {addTask}
                        toggleIsChecked = {toggleIsChecked}
                    />
                )
            })
        }
        </>
    );
}

export default App;
