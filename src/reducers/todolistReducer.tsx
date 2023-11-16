import { v1 } from "uuid";
import { FilterType, TodolistType } from "../App";

const defaultState: TodolistType[] = [
    {id:'todolistID1', title: 'What to learn', filter: 'all'},
    {id:'todolistID2', title: 'What to buy', filter: 'all'},
]

export const todolistReducer = (state = defaultState, action: MainActionsType): TodolistType[] => {
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

type MainActionsType = CreateNewTodolist | RemoveTodolist |ChangeTodolistTitleAC | ChangeTodolistFilter

export type CreateNewTodolist = ReturnType<typeof createNewTodolistAC>
export const createNewTodolistAC = (newTodolistTitle: string) => {
    const newTodolistID: string = v1()
    const newTodolist: TodolistType = {id: newTodolistID, title: newTodolistTitle, filter: 'all'}
    return {
        type: 'CREATE_TODOLIST',
        payload: {
            newTodolistID,
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