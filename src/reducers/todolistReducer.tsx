import { FilterType, TodolistType } from "../App";


export const todolistReducer = (state: TodolistType[], action: MainActionsType): TodolistType[] => {
    switch (action.type) {
        case 'CREATE_TODOLIST':
            return [...state, action.payload.newTodolist]

        case 'REMOVE_TODOLIST':
            return state.filter(tdList => tdList.id !== action.payload.todolstID)

        case 'CHANGE_TODOLIST_NAME':
            return state.map(todo => todo.id === action.payload.todolistId ? {...todo, title: action.payload.newTitle} : todo)    

        case 'CHANGE_TODOLIST_FILTER':
            return state.map(todo => todo.id === action.payload.todolistId ? {...todo, filter: action.payload.newFilter} : todo)

        default:
            return state
    }
}

type MainActionsType = createNewTodolist | RemoveTodolist |ChangeTodolistTitleAC | ChangeTodolistFilterAC

type createNewTodolist = ReturnType<typeof createNewTodolistAC>
export const createNewTodolistAC = (newTodolist: TodolistType) => {
    return {
        type: 'CREATE_TODOLIST',
        payload: {
            newTodolist
        }
    } as const
}

type RemoveTodolist = ReturnType<typeof removeTodolistAC>
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

type ChangeTodolistFilterAC = ReturnType<typeof changeTodolistFilterAC>
export const changeTodolistFilterAC = (todolistId: string, newFilter: FilterType) => {
    return {
        type: 'CHANGE_TODOLIST_FILTER',
        payload: {
            todolistId,
            newFilter
        }
    } as const
}