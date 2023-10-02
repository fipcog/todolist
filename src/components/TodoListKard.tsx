import React, { ChangeEvent, KeyboardEvent, useState } from "react";
import { FilterType } from "../App";
import "./todolistkardStyles.scss"

export type TaskType = {
    id: string
    isChecked: boolean
    name: string
}

export type TasksType = TaskType[]


type TodoListKardPropsType = {
    title: string
    tasks: TaskType[]
    filter: FilterType
    removeTaskHandler: (id: string) => void
    changeFilterHandler: (filterParameter: FilterType) => void
    addTask: (taskName: string) => void
    toggleIsChecked: (taskId: string) => void
}

export const TodoListKard: React.FC<TodoListKardPropsType> = (props) => {

    const { title, tasks, removeTaskHandler, changeFilterHandler, addTask, toggleIsChecked } = props

    const [inputValue, setInputValue] = useState<string>("")
    const [errorMassage, setErrorMassage] = useState<string | null>(null)

    const ListItems = tasks.map((task) => {
        return <li key={task.id}>
            <input id={task.id} type="checkbox" checked={task.isChecked} />
            <label htmlFor={task.id} onClick={() => toggleIsChecked(task.id)}></label>
            <span className={task.isChecked ? "task_done" : ""}>{task.name}</span>
            <button onClick={() => removeTaskHandler(task.id)}>x</button>
        </li>
    })

    const addNewTask = () => {
        if(inputValue.trim() === "") {
            setErrorMassage("Title is required")
            return
        }
        addTask(inputValue.trim())
        setInputValue("")
    }

    const onClickAddTaskHandler = (): void => {
        addNewTask()    
    }

    const onInputBtnPressHandler = (e:KeyboardEvent<HTMLInputElement>):void => {
        if (e.code === "Enter") {
            addNewTask()
        }
    }

    const onInputChangeHandler = (e:ChangeEvent<HTMLInputElement>): void => {
        e.currentTarget.value.trim().length > 15 ? setInputValue(inputValue) : setInputValue(e.currentTarget.value)
        setErrorMassage(null)
        if(e.currentTarget.value.trim().length > 15) setErrorMassage("Maximum number of characters")
    }

    return (
        <div className="todolist">
            <div className="todolist_content_wrapper">
                <h3>{title}</h3>
                <div className="todolist_input_wrapper">
                    <input value={inputValue} onChange={onInputChangeHandler} onKeyDown={onInputBtnPressHandler}/>
                    <button onClick={onClickAddTaskHandler}>+</button>
                    {errorMassage && <span className="error_massage">{errorMassage}</span>}
                </div>
                {tasks.length ? <ul className="task_list">{ListItems}</ul> : <ul>No task found</ul>}
                <div className="filter_wrapper">
                    <button className={props.filter === 'all' ? "active" : ""} onClick={()=>changeFilterHandler('all')}>All</button>
                    <button className={props.filter === 'active' ? "active" : ""} onClick={()=>changeFilterHandler('active')}>Active</button>
                    <button className={props.filter === 'completed' ? "active" : ""} onClick={()=>changeFilterHandler('completed')}>Completed</button>
                </div>
            </div>
        </div>
    )
}