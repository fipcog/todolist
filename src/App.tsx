import React, { useState } from 'react';
import './App.css';
import { TodoListKard, TasksType, TaskType } from './components/TodoListKard';

export type FilterType = 'all' | 'active' | 'completed'

function App() {

    const title: string = "Task Title"
    const [tasks, setTasks] = useState<Array<TaskType>>([
        {id: 1, isChecked: true, name:'HTML&CSS'},
        {id: 2, isChecked: false, name:'JS'},
        {id: 3, isChecked: false, name:'React'},
        {id: 4, isChecked: false, name:'Redux'}
    ])
    const [filter, setFilter] = useState<FilterType>('all')

    const removeTaskHandler = (id: number) :void => {
        const filteredTasks = tasks.filter(task => task.id !== id)
        setTasks(filteredTasks)
    }

    const changeFilterHandler = (filterParameter: FilterType):void => {
        setFilter(filterParameter)
    }

    let filteredTasks: TasksType

    switch (filter) {
        case 'active':
            filteredTasks = tasks.filter(task => !task.isChecked)
            break

        case 'completed':
            filteredTasks = tasks.filter(task => task.isChecked)
            break

        default:
            filteredTasks = tasks
    }

    return (
        <TodoListKard title={title} tasks={filteredTasks} removeTaskHandler={removeTaskHandler} changeFilterHandler={changeFilterHandler}/>
    );
}

export default App;
