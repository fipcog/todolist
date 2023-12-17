import React, { memo, useCallback, useEffect, useMemo } from "react";
import { FilterType } from "../../App";
import "./todolistkardStyles.scss"
import { AddItemInput } from "../additeminput/AddItemInput";
import { EditableSpan } from "../editablespan/EditableSpan";
import { useSelector } from "react-redux";
import { AppRootStateType, useAppDispatch } from "../../store/store";
import { useDispatch } from "react-redux";
import { changeTodolistFilterAC, changeTodolistTitleAC, changeTodolistTitleTC, removeTodolistAC, removeTodolistTC } from "../../reducers/todolistReducer";
import { addTaskAC, addTaskTC, setTasksTC } from "../../reducers/taskReducer";
import { Task } from "../task/Task";
import { Button } from "../button/Button";
import { TaskStatuses, TaskType } from "../../API/todolistAPI";

type TodoTasksType = TaskType[]

type TodoListKardPropsType = {
    todolistID: string
    title: string
    tdFilter: FilterType
}

export const TodoListCard: React.FC<TodoListKardPropsType> = memo((props) => {
    const {
        todolistID,
        title,
        tdFilter,
    } = props

    useEffect(() => {
        dispatch(setTasksTC(todolistID))
    }, [])

    const dispatch = useAppDispatch()
    const tasks = useSelector<AppRootStateType, TodoTasksType>(state => state.tasks[todolistID])
    let filteredTasks: TodoTasksType = useMemo(() => {
        switch (tdFilter) {
            case 'active':
                return tasks.filter(task => task.status === TaskStatuses.InProgress)

            case 'completed':
                return tasks.filter(task => task.status === TaskStatuses.Completed)

            default:
                return tasks
        }
    }, [tasks, tdFilter])

    const ListItems = filteredTasks.map((task) => {
        return <Task todolistID={todolistID} task={task} key={task.id} />
    })

    const removeTodolistHendler = useCallback((): void => {
        dispatch(removeTodolistTC(todolistID))
    }, [dispatch])

    const changeFilterHandler = useCallback((filterParameter: FilterType): void => {
        dispatch(changeTodolistFilterAC(todolistID, filterParameter))
    }, [dispatch])

    const changeTodolistTitleHandler = useCallback((title: string): void => {
        dispatch(changeTodolistTitleTC(todolistID, title))
    }, [dispatch])

    const addTaskHandler = useCallback((title: string) => {
        dispatch(addTaskTC(todolistID, title))
    }, [dispatch])

    return (
        <div className="todolist">
            <button onClick={removeTodolistHendler} />
            <div className="todolist_content_wrapper">
                <h3><EditableSpan
                    oldTitle={title}
                    callback={changeTodolistTitleHandler}
                    maxLength={13}
                /></h3>
                <AddItemInput callback={addTaskHandler} className={"card_input"} />
                {tasks.length ? <ul className="task_list">{ListItems}</ul> : <ul>No task found</ul>}
                <div className="filter_wrapper">
                    <Button className={"filter_button " + (tdFilter === 'all' ? "active" : '')}
                        callback={() => changeFilterHandler('all')}
                    >
                        All
                    </Button>
                    <Button className={"filter_button " + (tdFilter === 'active' ? "active" : '')}
                        callback={() => changeFilterHandler('active')}
                    >
                        Active
                    </Button>
                    <Button className={"filter_button " + (tdFilter === 'completed' ? "active" : '')}
                        callback={() => changeFilterHandler('completed')}
                    >
                        Completed
                    </Button>
                </div>
            </div>
        </div>
    )
})