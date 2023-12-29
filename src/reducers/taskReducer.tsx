import { v1 } from "uuid";
import { CreateNewTodolist, RemoveTodolist, setTodolistStatusAC, setTodolists } from "./todolistReducer";
import { ThunkCreatorType } from "../store/store";
import { TaskModel, TaskType, todolistAPI } from "../API/todolistAPI";
import { AxiosError } from "axios";
import { handleAppServerError, handleServerNetworkError } from "../utils/errorUtils";
import { setAppError, setAppStatus } from "./appReducer";
import { TasksType } from "../components/todolists/Todolists";

const defaultState: TasksType = {
    // todolistID1:[

    // ],
    // todolistID2:[

    // ]
}

export const tasksReducer = (state = defaultState, action: MainActionsType): TasksType => {
    switch (action.type) {
        case 'SET_TODOLISTS': {
            const newState = {...state}
            action.payload.lists.forEach(td => newState[td.id] = [])
            return newState
        }
        case 'CREATE_TODOLIST':
            return {...state, [action.payload.newTodolist.id]: []}

        case 'SET_TASKS': 
            return {...state, [action.payload.todolistID]: action.payload.tasks}

        case 'ADD_TASK':
            return {...state, [action.payload.todolistID]: [action.payload.task, ...state[action.payload.todolistID]]}

        case 'REMOVE_TODOLIST':
            const newState: TasksType = {...state}
            delete newState[action.payload.todolstID]
            return newState

        case 'REMOVE_TASK': 
            return {...state, [action.payload.todolistID]: [...state[action.payload.todolistID].filter(task => task.id !== action.payload.taskId)]}

        case 'TOGGLE_TASK_ISCHECKED': 
            return {...state, [action.payload.todolistID]: [...state[action.payload.todolistID]
                                                            .map(task => task.id === action.payload.taskID ? {...task, status: action.payload.status} : task)]}    
            
        case 'CHANGE_TASK_TITLE': 
            return {...state, [action.payload.todolistID]: state[action.payload.todolistID]
                                                            .map(task => task.id === action.payload.taskID ? {...task, title: action.payload.taskTitle} : task)}

        default: 
            return state
    }
}

type MainActionsType = AddTask 
                                | RemoveTask 
                                | ToggleIsChecked 
                                | ChangeTaskTitle 
                                | CreateNewTodolist 
                                | RemoveTodolist 
                                | setTodolists
                                | SetTasks

type AddTask = ReturnType<typeof addTaskAC>
export const addTaskAC = (todolistID: string, task: TaskType) => {
    return {
        type: 'ADD_TASK',
        payload: {
            todolistID,
            task
        }
    } as const
}

type RemoveTask = ReturnType<typeof removeTaskAC>
export const removeTaskAC = (todolistID: string, taskId: string) => {
    return {
        type: 'REMOVE_TASK',
        payload: {
            todolistID,
            taskId
        }
    } as const
}

type ToggleIsChecked = ReturnType<typeof toggleIsCheckedAC>
export const toggleIsCheckedAC = (todolistID: string, taskID: string, status: number) => {
    return {
        type: 'TOGGLE_TASK_ISCHECKED',
        payload: {
            todolistID,
            taskID,
            status
        }
    }   as const
}

type ChangeTaskTitle = ReturnType<typeof changeTaskTitleAC>
export const changeTaskTitleAC = (todolistID: string, taskID: string, taskTitle: string) => {
    return {
        type: 'CHANGE_TASK_TITLE',
        payload: {
            todolistID,
            taskID,
            taskTitle
        }
    } as const
}

type SetTasks = ReturnType<typeof setTasksAC>
export const setTasksAC = (todolistID: string, tasks: TaskType[]) => {
    // debugger
    return {
        type: 'SET_TASKS',
        payload: {
            todolistID,
            tasks
        }
    } as const
}

export const setTasksTC = (todolistId: string): ThunkCreatorType => {
    return (dispatch) => {
        dispatch(setAppStatus('loading'))
        dispatch(setTodolistStatusAC(todolistId, 'loading'))
        todolistAPI.getTasks(todolistId)
        .then(res => {
            if(!res.data.error) {
                dispatch(setTasksAC(todolistId, res.data.items))
                dispatch(setAppStatus('succeeded'))
                dispatch(setTodolistStatusAC(todolistId, 'succeeded'))
            } else {
                dispatch(setAppError(res.data.error))
                dispatch(setAppStatus('failed'))
                dispatch(setTodolistStatusAC(todolistId, 'idle'))
            }
        })
        .catch((err: AxiosError) => {
            handleServerNetworkError(err.message, dispatch)
            dispatch(setTodolistStatusAC(todolistId, 'idle'))
        })
    }
}

export const addTaskTC = (todolistId: string, title: string): ThunkCreatorType => {
    return (dispatch) => {
        dispatch(setAppStatus('loading'))
        dispatch(setTodolistStatusAC(todolistId, 'loading'))
        todolistAPI.createTask(todolistId, title)
        .then(res => {
            if(res.data.resultCode === 0) {
                dispatch(addTaskAC(todolistId, res.data.data.item))
                dispatch(setAppStatus('succeeded'))
                dispatch(setTodolistStatusAC(todolistId, 'succeeded'))
            } else {
                handleAppServerError<{item: TaskType}>(res.data, dispatch)
                dispatch(setTodolistStatusAC(todolistId, 'idle'))
            }
        })
        .catch((err: AxiosError) => {
            handleServerNetworkError(err.message, dispatch)
            dispatch(setTodolistStatusAC(todolistId, 'idle'))
        })
    }
}

export const removeTaskTC = (todolistId: string, taskId: string): ThunkCreatorType => {
    return (dispatch) => {
        dispatch(setAppStatus('loading'))
        dispatch(setTodolistStatusAC(todolistId, 'loading'))
        todolistAPI.deleteTask(todolistId, taskId)
        .then(res => {
            if(res.data.resultCode === 0) {
                dispatch(removeTaskAC(todolistId, taskId))
                dispatch(setAppStatus('succeeded'))
                dispatch(setTodolistStatusAC(todolistId, 'succeeded'))
            } else {
                handleAppServerError(res.data, dispatch)
                dispatch(setTodolistStatusAC(todolistId, 'idle'))
            }
        })
        .catch((err: AxiosError) => {
            handleServerNetworkError(err.message, dispatch)
            dispatch(setTodolistStatusAC(todolistId, 'idle'))
        })
    }
}

export const changeTaskTitleTC = (todolistId: string, taskId: string, title: string): ThunkCreatorType => {
    return (dispatch, getState) => {
        dispatch(setAppStatus('loading'))
        dispatch(setTodolistStatusAC(todolistId, 'loading'))
        const task = getState().tasks[todolistId].find(t => t.id === taskId)
        if(task) {
            const model: TaskModel = {
                title,
                description: task.description,
                status: task.status,
                priority: task.priority,
                startDate: task.startDate,
                deadline: task.deadline,
            }

            todolistAPI.updateTask(todolistId, taskId, model)
            .then(res => {
                if(res.data.resultCode === 0) {
                    dispatch(changeTaskTitleAC(todolistId, taskId, title))
                    dispatch(setAppStatus('succeeded'))
                    dispatch(setTodolistStatusAC(todolistId, 'succeeded'))
                } else {
                    handleAppServerError<{item: TaskType}>(res.data, dispatch)
                    dispatch(setTodolistStatusAC(todolistId, 'idle'))
                }
            })
            .catch((err: AxiosError) => {
                handleServerNetworkError(err.message, dispatch)
                dispatch(setTodolistStatusAC(todolistId, 'idle'))
            })
        }
    }
}

export const toggleTaskCompletedTC = (todolistId: string, taskId: string, status: number): ThunkCreatorType => {
    return (dispatch, getState) => {
        dispatch(setAppStatus('loading'))
        dispatch(setTodolistStatusAC(todolistId, 'loading'))
        const task = getState().tasks[todolistId].find(t => t.id === taskId)
        if(task) {
            const model: TaskModel = {
                title: task.title,
                description: task.description,
                status: status,
                priority: task.priority,
                startDate: task.startDate,
                deadline: task.deadline,
            }

            todolistAPI.updateTask(todolistId, taskId, model)
            .then(res => {
                if(res.data.resultCode === 0) {
                    dispatch(toggleIsCheckedAC(todolistId, taskId, status))
                    dispatch(setAppStatus('succeeded'))
                    dispatch(setTodolistStatusAC(todolistId, 'succeeded'))
                } else {
                    handleAppServerError<{item: TaskType}>(res.data, dispatch)
                    dispatch(setTodolistStatusAC(todolistId, 'idle'))
                }
            })
            .catch((err: AxiosError) => {
                handleServerNetworkError(err.message, dispatch)
                dispatch(setTodolistStatusAC(todolistId, 'idle'))
            })
        }
    }
}