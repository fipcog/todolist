import React, { useState } from 'react';
import './App.css';
import { TodoListKard, TasksType, TaskType } from './components/TodoListKard';

export type FilterType = 'all' | 'active' | 'completed'

function App() {

    const title: string = "Task Title"
    const [tasks, setTasks] = useState<Array<TaskType>>([
        {id: crypto.randomUUID(), isChecked: true, name:'HTML&CSS'},
        {id: crypto.randomUUID(), isChecked: false, name:'JS'},
        {id: crypto.randomUUID(), isChecked: false, name:'React'},
        {id: crypto.randomUUID(), isChecked: false, name:'Redux'}
    ])
    const [filter, setFilter] = useState<FilterType>('all')

    const toggleIsChecked = (taskId: string) => {
        const newArr: TaskType[] = tasks.map(item => {
            if(item.id === taskId) return {...item, isChecked: !item.isChecked}
            return item
        })
        setTasks(newArr)
    }

    const removeTaskHandler = (id: string): void => {
        const filteredTasks = tasks.filter(task => task.id !== id)
        setTasks(filteredTasks)
    }

    const changeFilterHandler = (filterParameter: FilterType): void => {
        setFilter(filterParameter)
    }

    const addTask = (taskName: string): void => {
        setTasks([{id: crypto.randomUUID(), isChecked: false, name: taskName}, ...tasks])
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
        <TodoListKard   title={title} 
                        tasks={filteredTasks} 
                        removeTaskHandler={removeTaskHandler} 
                        changeFilterHandler={changeFilterHandler}
                        addTask={addTask}
                        toggleIsChecked={toggleIsChecked}
                        filter={filter}
        />
    );
}

export default App;
