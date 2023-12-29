import { v1 } from "uuid";
import { TodolistType, todolistAPI } from "../API/todolistAPI";
import { ThunkCreatorType } from "../store/store";
import { RequestStatusType, setAppError, setAppStatus } from "./appReducer";
import { AxiosError } from "axios";
import { handleAppServerError, handleServerNetworkError } from "../utils/errorUtils";
import { FilterType } from "../components/todolists/Todolists";

export type TodolistCompletedType = TodolistType & {filter: FilterType, status: RequestStatusType}

const defaultState: TodolistCompletedType[] = [
    // {id:'todolistID1', title: 'What to learn', filter: 'all'},
    // {id:'todolistID2', title: 'What to buy', filter: 'all'},
]

export const todolistReducer = (state = defaultState, action: MainActionsType): TodolistCompletedType[] => {
    switch (action.type) {
        case 'SET_TODOLISTS':
            return action.payload.lists.map(td => ({...td, filter: 'all', status: 'idle'}))

        case 'CREATE_TODOLIST':
            return [action.payload.newTodolist, ...state]

        case 'REMOVE_TODOLIST':
            return state.filter(tdList => tdList.id !== action.payload.todolstID)

        case 'CHANGE_TODOLIST_NAME':
            return state.map(todo => todo.id === action.payload.todolistId ? {...todo, title: action.payload.newTitle} : todo)    

        case 'CHANGE_TODOLIST_FILTER':
            return state.map(todo => todo.id === action.payload.todolistId ? {...todo, filter: action.payload.newFilter} : todo)
        
        case 'SET_TODOLIST_STATUS':
            return state.map(todo => todo.id === action.payload.todoId ? {...todo, status: action.payload.status} : todo)

        default:
            return state
    }
}

type MainActionsType = CreateNewTodolist 
| RemoveTodolist 
| ChangeTodolistTitleAC 
| ChangeTodolistFilter 
| setTodolists
| SetTodolistStatus

export type setTodolists = ReturnType<typeof setTodolistsAC>
export const setTodolistsAC = (lists: TodolistType[]) => {
    return {
        type: 'SET_TODOLISTS',
        payload: {
            lists
        }
    } as const
}

export type CreateNewTodolist = ReturnType<typeof createNewTodolistAC>
export const createNewTodolistAC = (newTodolist: TodolistCompletedType) => {
    return {
        type: 'CREATE_TODOLIST',
        payload: {
            newTodolist
        }
    } as const
}

export type RemoveTodolist = ReturnType<typeof removeTodolistAC>
export const removeTodolistAC = (todolstID: string) => {
    return {
        type: 'REMOVE_TODOLIST',
        payload: {
            todolstID
        }
    } as const
}

type ChangeTodolistTitleAC = ReturnType<typeof changeTodolistTitleAC>
export const changeTodolistTitleAC = (todolistId: string, newTitle: string) => {
    return {
        type: 'CHANGE_TODOLIST_NAME',
        payload: {
            todolistId,
            newTitle
        }
    } as const
}

type ChangeTodolistFilter = ReturnType<typeof changeTodolistFilterAC>
export const changeTodolistFilterAC = (todolistId: string, newFilter: FilterType) => {
    return {
        type: 'CHANGE_TODOLIST_FILTER',
        payload: {
            todolistId,
            newFilter
        }
    } as const
}

type SetTodolistStatus = ReturnType<typeof setTodolistStatusAC>
export const setTodolistStatusAC = (todoId: string, status: RequestStatusType) => {
    return {
        type: 'SET_TODOLIST_STATUS',
        payload: {
            todoId,
            status
        }
    } as const
}

export const setTodolistsTC = (): ThunkCreatorType => {
    return (dispatch) => {
        dispatch(setAppStatus('loading'))
        return todolistAPI.getTodolists()
        .then(res => {
            dispatch(setTodolistsAC(res.data))
            dispatch(setAppStatus('succeeded'))
        })
        .catch((err: AxiosError) => {
            handleServerNetworkError(err.message, dispatch)
        })
    }
}

export const  createNewTodolistTC = (title: string): ThunkCreatorType => {
    return (dispatch) => {
        dispatch(setAppStatus('loading'))
        todolistAPI.createTodolist(title)
        .then(res => {
            if(res.data.resultCode === 0) {
                dispatch(createNewTodolistAC({...res.data.data.item, filter: 'all', status: 'idle'}))
                dispatch(setAppStatus('succeeded'))
            } else {
                handleAppServerError<{item: TodolistType}>(res.data, dispatch)
            }
        })
        .catch((err: AxiosError) => {
            handleServerNetworkError(err.message, dispatch)
        })
    }
}

export const removeTodolistTC = (todolistId: string): ThunkCreatorType => {
    return (dispatch) => {
        dispatch(setAppStatus('loading'))
        dispatch(setTodolistStatusAC(todolistId, 'loading'))
        todolistAPI.deleteTodolist(todolistId)
        .then(res => {
            if(res.data.resultCode === 0) {
                dispatch(removeTodolistAC(todolistId))
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

export const changeTodolistTitleTC = (todolistId: string, title: string): ThunkCreatorType => {
    return (dispatch, getState) => {
        dispatch(setAppStatus('loading'))
        dispatch(setTodolistStatusAC(todolistId, 'loading'))
        todolistAPI.updateTodolist(todolistId, title)
        .then(res => {
            if(res.data.resultCode === 0) {
                dispatch(changeTodolistTitleAC(todolistId, title))
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