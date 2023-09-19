import React from "react";
import { FilterType } from "../App";

export type TaskType = {
    id: number
    isChecked: boolean
    name: string
}

export type TasksType = TaskType[]


type TodoListKardPropsType = {
    title: string
    tasks: TaskType[]
    removeTaskHandler: (id: number) => void
    changeFilterHandler: (filterParameter: FilterType) => void
}

export const TodoListKard: React.FC<TodoListKardPropsType> = (props) => {

    const { title, tasks, removeTaskHandler, changeFilterHandler } = props

    const ListItems = tasks.map((task, i) => {
        return <li key={i}>
            <input type="checkbox" checked={task.isChecked} />
            <span>{task.name}</span>
            <button onClick={()=>removeTaskHandler(task.id)}>x</button>
        </li>
    })


    return (
        <div className="App">
            <div>
                <h3>{title}</h3>
                <div>
                    <input />
                    <button>+</button>
                </div>
                {tasks.length ? <ul>{ListItems}</ul> : <ul>No task found</ul>}
                <div>
                    <button onClick={()=>changeFilterHandler('all')}>All</button>
                    <button onClick={()=>changeFilterHandler('active')}>Active</button>
                    <button onClick={()=>changeFilterHandler('completed')}>Completed</button>
                </div>
            </div>
        </div>
    )
}