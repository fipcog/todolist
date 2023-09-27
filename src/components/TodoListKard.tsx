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
    removeTaskHandler: (id: string) => void
    changeFilterHandler: (filterParameter: FilterType) => void
    addTask: (taskName: string) => void
    toggleIsChecked: (taskId: string) => void
}

export const TodoListKard: React.FC<TodoListKardPropsType> = (props) => {

    const { title, tasks, removeTaskHandler, changeFilterHandler, addTask, toggleIsChecked } = props

    const [inputValue, setInputValue] = useState<string>("")

    const ListItems = tasks.map((task) => {
        return <li key={task.id}>
            <input id={task.id} type="checkbox" checked={task.isChecked} />
            <label htmlFor={task.id} onClick={() => toggleIsChecked(task.id)}></label>
            <span>{task.name}</span>
            <button onClick={() => removeTaskHandler(task.id)}>x</button>
        </li>
    })

    const addNewTask = () => {
        if(inputValue.length < 2) return
        addTask(inputValue)
        setInputValue("")
    }

    const onClickAddTaskHandler = (): void => {
        addNewTask()    
    }

    const onInputBtnPressHandler = (e:KeyboardEvent<HTMLInputElement>):void => {
        if (e.code === "Enter") addNewTask()
    }

    const onInputChangeHandler = (e:ChangeEvent<HTMLInputElement>): void => {
        e.currentTarget.value.length > 15 ? setInputValue(inputValue) : setInputValue(e.currentTarget.value)  
    }

    return (
        <div className="todolist">
            <div className="todolist_content_wrapper">
                <h3>{title}</h3>
                <div className="todolist_input_wrapper">
                    <input value={inputValue} onChange={onInputChangeHandler} onKeyDown={onInputBtnPressHandler}/>
                    <button onClick={onClickAddTaskHandler}>+</button>
                </div>
                {tasks.length ? <ul className="task_list">{ListItems}</ul> : <ul>No task found</ul>}
                <div className="filter_wrapper">
                    <button onClick={()=>changeFilterHandler('all')}>All</button>
                    <button onClick={()=>changeFilterHandler('active')}>Active</button>
                    <button onClick={()=>changeFilterHandler('completed')}>Completed</button>
                </div>
            </div>
        </div>
    )
}