import { v1 } from "uuid";
import { TasksType } from "../App";
import { CreateNewTodolist, RemoveTodolist } from "./todolistReducer";

export const tasksReducer = (state: TasksType, action: MainActionsType):TasksType => {
    switch (action.type) {
        case 'ADD_TASK':
            return {...state, [action.payload.todolistID]: [{id: v1(), title: action.payload.taskName, isDone: false}, ...state[action.payload.todolistID]]}
        
        case 'CREATE_TODOLIST':
            return {...state, [action.payload.newTodolistID]: []}

        case 'REMOVE_TODOLIST':
            const newState: TasksType = {...state}
            delete newState[action.payload.todolstID]
            return newState

        case 'REMOVE_TASK': 
            return {...state, [action.payload.todolistID]: [...state[action.payload.todolistID].filter(task => task.id !== action.payload.taskId)]}

        case 'TOGGLE_TASK_ISCHECKED': 
            return {...state, [action.payload.todolistID]: [...state[action.payload.todolistID]
                                                            .map(task => task.id === action.payload.taskID ? {...task, isDone: !task.isDone}: task)]}    
            
        case 'CHANGE_TASK_TITLE': 
            return {...state, [action.payload.todolistID]: state[action.payload.todolistID]
                                                            .map(task => task.id === action.payload.taskID ? {...task, title: action.payload.taskTitle} : task)}

        default: 
            return state
    }
}

type MainActionsType = AddTask | RemoveTask | ToggleIsChecked | ChangeTaskTitle | CreateNewTodolist | RemoveTodolist

type AddTask = ReturnType<typeof addTaskAC>
export const addTaskAC = (todolistID: string, taskName: string) => {
    return {
        type: 'ADD_TASK',
        payload: {
            todolistID,
            taskName
        }
    } as const
}

// type AddNewEmptyTasksList = ReturnType<typeof addNewEmptyTasksList>
// export const addNewEmptyTasksList = (NewTodolistID: string) => {
//     return {
//         type: 'ADD_NEW_EMPTY_TASKS_LIST',
//         payload: {
//             NewTodolistID
//         }
//     } as const 
// }

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
export const toggleIsCheckedAC = (todolistID: string, taskID: string) => {
    return {
        type: 'TOGGLE_TASK_ISCHECKED',
        payload: {
            todolistID,
            taskID
        }
    }   as const
}

type ChangeTaskTitle = ReturnType<typeof changeTaskTitleAC>
export const changeTaskTitleAC = (todolistID: string, taskID: string ,taskTitle: string) => {
    return {
        type: 'CHANGE_TASK_TITLE',
        payload: {
            todolistID,
            taskID,
            taskTitle
        }
    } as const
}