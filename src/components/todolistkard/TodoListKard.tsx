import React, { ChangeEvent, KeyboardEvent, useState } from "react";
import { FilterType } from "../../App";
import "./todolistkardStyles.scss"
import { AddItemInput } from "../additeminput/AddItemInput";
import { EditableSpan } from "../editablespan/EditableSpan";

export type TaskType = {
    id: string
    isDone: boolean
    title: string
}

type TasksType = TaskType[]

type TodoListKardPropsType = {
    todolistID: string
    title: string
    tasks: TaskType[]
    removeTask: (todolistID: string, taskID: string) => void
    addTask: (todolistID: string, taskName: string) => void
    toggleIsChecked: (todolistID: string, taskID: string) => void
    removeTodolist: (todolistID: string) => void
    changeTaskTitle: (todolistID: string, taskID: string ,taskTitle: string) => void
    changeTodolistTitle: (todolistID: string, todoTitle: string) => void
}

export const TodoListKard: React.FC<TodoListKardPropsType> = (props) => {
    const { 
            todolistID, 
            title, 
            tasks, 
            removeTask, 
            addTask, 
            toggleIsChecked, 
            removeTodolist,
            changeTaskTitle,
            changeTodolistTitle 
        } = props

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
        const toggleIsCheckedHandler = (): void =>  toggleIsChecked(todolistID ,task.id) 
        const removeTaskHandler = (): void =>  removeTask(todolistID, task.id) 
        const changeTaskTitleHandler = (taskTitle: string): void => changeTaskTitle(todolistID, task.id, taskTitle)

        return <li key={task.id}>
            <input id={task.id} type="checkbox" checked={task.isDone} />
            <label htmlFor={task.id} onClick={toggleIsCheckedHandler}></label>
            <EditableSpan spanClassName={task.isDone ? "task_done" : ""}
                oldTitle={task.title} 
                callback={changeTaskTitleHandler} 
                maxNumOFChar={15}
            />
            <button onClick={removeTaskHandler}>x</button>
        </li>
    })

    const removeTodolistHendler = (): void => {
        removeTodolist(todolistID)
    }

    const changeFilterHandler = (filterParameter: FilterType): void => { setFilter(filterParameter)}

    const changeTodolistTitleHandler = (title: string): void => changeTodolistTitle(todolistID, title)

    return (
        <div className="todolist">
            <button onClick={removeTodolistHendler}/>
            <div className="todolist_content_wrapper">
                <h3><EditableSpan 
                    oldTitle={title} 
                    callback={changeTodolistTitleHandler} 
                    maxNumOFChar={13}
                /></h3>
                <AddItemInput callback={title => addTask(todolistID, title)}/>
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