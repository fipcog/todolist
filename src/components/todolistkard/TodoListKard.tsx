import React from "react";
import { FilterType } from "../../App";
import "./todolistkardStyles.scss"
import { AddItemInput } from "../additeminput/AddItemInput";
import { EditableSpan } from "../editablespan/EditableSpan";
import { Checkbox } from "../checkbox/Checkbox";
import { useSelector } from "react-redux";
import { AppRootStateType } from "../../store/store";
import { useDispatch } from "react-redux";
import { changeTodolistFilterAC, changeTodolistTitleAC, removeTodolistAC } from "../../reducers/todolistReducer";
import { addTaskAC, changeTaskTitleAC, removeTaskAC, toggleIsCheckedAC } from "../../reducers/taskReducer";

export type TaskType = {
    id: string
    isDone: boolean
    title: string
}

type TodoTasksType = TaskType[]

type TodoListKardPropsType = {
    todolistID: string
    title: string
    tdFilter: FilterType
}

export const TodoListKard: React.FC<TodoListKardPropsType> = (props) => {
    const { 
            todolistID, 
            title, 
            tdFilter, 
        } = props

    const dispatch = useDispatch()
    const tasks = useSelector<AppRootStateType, TodoTasksType>(state => state.tasks[todolistID])
    let filteredTasks: TodoTasksType

    switch (tdFilter) {
        case 'active':
            filteredTasks = tasks.filter(task => !task.isDone)
            break

        case 'completed':
            filteredTasks = tasks.filter(task => task.isDone)
            break

        default:
            filteredTasks = tasks
    }

    const toggleIsCheckedHandler = (taskId: string): void => {
        dispatch(toggleIsCheckedAC(todolistID , taskId))
    }

    const removeTaskHandler = (taskId: string): void => {
        dispatch(removeTaskAC(todolistID, taskId))
    }

    const changeTaskTitleHandler = (taskId: string, taskTitle: string): void => {
        dispatch(changeTaskTitleAC(todolistID, taskId, taskTitle))
    }

    const ListItems = filteredTasks.map((task) => {

        return <li key={task.id}>
            <Checkbox id={task.id} checked={task.isDone} callback={() => toggleIsCheckedHandler(task.id)} />
            <EditableSpan spanClassName={task.isDone ? "task_done" : ""}
                oldTitle={task.title} 
                callback={(title) => changeTaskTitleHandler(task.id, title)} 
                maxNumOFChar={15}
            />
            <button onClick={() => removeTaskHandler(task.id)}>x</button>
        </li>
    })

    const removeTodolistHendler = (): void => {
        dispatch(removeTodolistAC(todolistID))
    }

    const changeFilterHandler = (filterParameter: FilterType) :void => {
        dispatch(changeTodolistFilterAC(todolistID, filterParameter))
    }

    const changeTodolistTitleHandler = (title: string): void => {
        dispatch(changeTodolistTitleAC(todolistID, title))
    }

    const addTaskHandler = (title: string) => {
        dispatch(addTaskAC(todolistID, title))
    }

    return (
        <div className="todolist">
            <button onClick={removeTodolistHendler}/>
            <div className="todolist_content_wrapper">
                <h3><EditableSpan 
                    oldTitle={title} 
                    callback={changeTodolistTitleHandler} 
                    maxNumOFChar={13}
                /></h3>
                <AddItemInput callback={addTaskHandler}/>
                {tasks.length ? <ul className="task_list">{ListItems}</ul> : <ul>No task found</ul>}
                <div className="filter_wrapper">
                    <button className={tdFilter === 'all' ? "active" : undefined} onClick={()=>changeFilterHandler('all')}>All</button>
                    <button className={tdFilter === 'active' ? "active" : undefined} onClick={()=>changeFilterHandler('active')}>Active</button>
                    <button className={tdFilter === 'completed' ? "active" : undefined} onClick={()=>changeFilterHandler('completed')}>Completed</button>
                </div>
            </div>
        </div>
    )
}