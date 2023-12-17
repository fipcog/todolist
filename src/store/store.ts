import { AnyAction, applyMiddleware, combineReducers, legacy_createStore } from 'redux'
import { todolistReducer } from '../reducers/todolistReducer'
import { tasksReducer } from '../reducers/taskReducer'
import { ThunkAction, ThunkDispatch, thunk } from 'redux-thunk'
import { useDispatch } from 'react-redux'


const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistReducer
})

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk))

export type AppRootStateType = ReturnType<typeof rootReducer>

// а это, чтобы можно было в консоли браузера обращаться к store в любой момент
// @ts-ignore
window.store = store

export type ThunkCreatorType<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, AnyAction>

type DispatchType = ThunkDispatch<AppRootStateType, unknown, AnyAction>
export const useAppDispatch = useDispatch<DispatchType>