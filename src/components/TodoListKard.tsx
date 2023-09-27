import React, { ChangeEvent, KeyboardEvent, useState } from "react";
import { FilterType } from "../App";

export type TaskType = {
    id: string
    isChecked: boolean
    name: string
}

export type TasksType = TaskType[]


type TodoListKardPropsType = {
    title: string
    tasks: TaskType[]
    removeTaskHandler: (id: string) => void
    changeFilterHandler: (filterParameter: FilterType) => void
    addTask: (taskName: string) => void
}

export const TodoListKard: React.FC<TodoListKardPropsType> = (props) => {

    const { title, tasks, removeTaskHandler, changeFilterHandler, addTask } = props

    const [inputValue, setInputValue] = useState<string>("")

    const ListItems = tasks.map((task) => {
        return <li key={task.id}>
            <input type="checkbox" checked={task.isChecked} />
            <span>{task.name}</span>
            <button onClick={()=>removeTaskHandler(task.id)}>x</button>
        </li>
    })

    const onClickAddTaskHandler = (): void => {
        addTask(inputValue)
        setInputValue("")
    }

    const onInputBtnPressHandler = (e:KeyboardEvent<HTMLInputElement>):void => {
        if (e.code === "Enter") {
            addTask(inputValue)
            setInputValue("")
        }
    }

    const onInputChangeHandler = (e:ChangeEvent<HTMLInputElement>): void => {
        setInputValue(e.currentTarget.value)
    }

    return (
        <div className="App">
            <div>
                <h3>{title}</h3>
                <div>
                    <input value={inputValue} onChange={onInputChangeHandler} onKeyDown={onInputBtnPressHandler}/>
                    <button onClick={onClickAddTaskHandler}>+</button>
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