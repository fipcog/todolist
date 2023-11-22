import React, { memo, useCallback, useMemo } from "react";
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
import { Task } from "../task/Task";
import { Button } from "../button/Button";

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

export const TodoListKard: React.FC<TodoListKardPropsType> = memo((props) => {
    const { 
            todolistID, 
            title, 
            tdFilter, 
        } = props

    const dispatch = useDispatch()
    const tasks = useSelector<AppRootStateType, TodoTasksType>(state => state.tasks[todolistID])
    let filteredTasks: TodoTasksType = useMemo(() => {
        switch (tdFilter) {
            case 'active':
                return tasks.filter(task => !task.isDone)
    
            case 'completed':
                return tasks.filter(task => task.isDone)
    
            default:
                return tasks
        }
    }, [tasks, tdFilter])

    const ListItems = filteredTasks.map((task) => {
        return <Task todolistID={todolistID} task={task} key={task.id}/>
    })

    const removeTodolistHendler = useCallback((): void => {
        dispatch(removeTodolistAC(todolistID))
    }, [dispatch])

    const changeFilterHandler = useCallback((filterParameter: FilterType) :void => {
        dispatch(changeTodolistFilterAC(todolistID, filterParameter))
    },[dispatch])

    const changeTodolistTitleHandler = useCallback((title: string): void => {
        dispatch(changeTodolistTitleAC(todolistID, title))
    }, [dispatch])

    const addTaskHandler = useCallback((title: string) => {
        dispatch(addTaskAC(todolistID, title))
    }, [dispatch])

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
                    <Button className={tdFilter === 'all' ? "active" : undefined} callback={()=>changeFilterHandler('all')}>All</Button>
                    <Button className={tdFilter === 'active' ? "active" : undefined} callback={()=>changeFilterHandler('active')}>Active</Button>
                    <Button className={tdFilter === 'completed' ? "active" : undefined} callback={()=>changeFilterHandler('completed')}>Completed</Button>
                </div>
            </div>
        </div>
    )
})