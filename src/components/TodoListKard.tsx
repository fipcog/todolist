import React, { ChangeEvent, KeyboardEvent, useState } from "react";
import { FilterType } from "../App";
import "./todolistkardStyles.scss"

export type TaskType = {
    id: string
    isDone: boolean
    title: string
}

type TasksType = TaskType[]

type TodoListKardPropsType = {
    id: string
    title: string
    tasks: TaskType[]
    removeTaskHandler: (id: string) => void
    addTask: (taskName: string) => void
    toggleIsChecked: (taskId: string) => void
}

export const TodoListKard: React.FC<TodoListKardPropsType> = (props) => {

    const { title, tasks, removeTaskHandler, addTask, toggleIsChecked } = props

    const [inputValue, setInputValue] = useState<string>("")
    const [errorMassage, setErrorMassage] = useState<string | null>(null)
    const [filter, setFilter] = useState<FilterType>('all')

    let filteredTasks: TasksType

    switch (filter) {
        case 'active':
            filteredTasks = tasks.filter(task => !task.isDone)
            break

        case 'completed':
            filteredTasks = tasks.filter(task => task.isDone)
            break

        default:
            filteredTasks = tasks
    }

    const ListItems = filteredTasks.map((task) => {
        return <li key={task.id}>
            <input id={task.id} type="checkbox" checked={task.isDone} />
            <label htmlFor={task.id} onClick={() => toggleIsChecked(task.id)}></label>
            <span className={task.isDone ? "task_done" : ""}>{task.title}</span>
            <button onClick={() => removeTaskHandler(task.id)}>x</button>
        </li>
    })

    const changeFilterHandler = (filterParameter: FilterType): void => {
        setFilter(filterParameter)
    }

    const addNewTask = () => {
        if(inputValue.trim() === "") {
            setErrorMassage("Title is required")
            return
        }
        addTask(inputValue.trim())
        setInputValue("")
        setErrorMassage(null)
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
                    <input value={inputValue} className={errorMassage ? "error" : undefined} onChange={onInputChangeHandler} onKeyDown={onInputBtnPressHandler}/>
                    <button onClick={onClickAddTaskHandler}>+</button>
                    {errorMassage && <span className="error_massage">{errorMassage}</span>}
                </div>
                {tasks.length ? <ul className="task_list">{ListItems}</ul> : <ul>No task found</ul>}
                <div className="filter_wrapper">
                    <button className={filter === 'all' ? "active" : undefined} onClick={()=>changeFilterHandler('all')}>All</button>
                    <button className={filter === 'active' ? "active" : undefined} onClick={()=>changeFilterHandler('active')}>Active</button>
                    <button className={filter === 'completed' ? "active" : undefined} onClick={()=>changeFilterHandler('completed')}>Completed</button>
                </div>
            </div>
        </div>
    )
}