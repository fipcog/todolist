import axios from "axios"
import { UserDataType, loginAPI } from "../API/loginAPI"
import { LoginValues } from "../components/login/Login"
import { ThunkCreatorType } from "../store/store"
import { handleAppServerError, handleServerNetworkError } from "../utils/errorUtils"

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
type InitialAppStateType = {
    status: RequestStatusType
    error: string | null
    isLogged: boolean
    isInitialized: boolean
}
const initialAppState: InitialAppStateType = {
    status: 'succeeded',
    error: null,
    isLogged: false,
    isInitialized: false
}


export const appReducer = (state: InitialAppStateType = initialAppState, action: MainActionType): InitialAppStateType => {
    switch(action.type) {
        case 'SET_APP_STATUS':
            return {...state, status: action.payload.status}
        case 'SET_APP_ERROR':
            return {...state, error: action.payload.error}
        case 'SET_IS_LOGGED':
            return {...state, isLogged: action.payload.isLogged}
        case 'SET_IS_INITIALIZED':
            return {...state, isInitialized: action.payload.isInitialized}
        default:
            return state
    }
}

type MainActionType = SetAppStatus | SetAppErrorType | SetIsLogged | SetIsInitialized

type SetAppStatus = ReturnType<typeof setAppStatus>
export const setAppStatus = (status: RequestStatusType) => {
    return {
        type: 'SET_APP_STATUS',
        payload: {
            status
        }
    } as const
}

type SetAppErrorType = ReturnType<typeof setAppError>
export const setAppError = (error: string|null) => {
    return {
        type: 'SET_APP_ERROR',
        payload: {
            error
        }
    }   as const
}

type SetIsLogged = ReturnType<typeof setIsLoggedAC>
export const setIsLoggedAC = (isLogged: boolean) => {
    return {
        type: 'SET_IS_LOGGED',
        payload: {
            isLogged
        }
    } as const
}

type SetIsInitialized = ReturnType<typeof setIsInitializedAC>
export const setIsInitializedAC = (isInitialized: boolean) => {
    return {
        type: 'SET_IS_INITIALIZED',
        payload: {
            isInitialized
        }
    } as const
}


export const logInTC = (values: LoginValues): ThunkCreatorType => {
    return async (dispatch) => {
        try {
            dispatch(setAppStatus('loading'))
            const response = await loginAPI.logIn(values)
            if(response.data.resultCode === 0) {
                dispatch(setIsLoggedAC(true))
                dispatch(setAppStatus('succeeded'))
            } else {
                handleAppServerError<{userId: number}>(response.data, dispatch)
            }
        }  catch(err) {
            if(axios.isAxiosError(err)) {
                handleServerNetworkError(err.message, dispatch)
            } else {
                handleServerNetworkError((err as Error).message, dispatch)
            }
        }
    }
}

export const logOutTC = (): ThunkCreatorType => {
    return async (dispatch) => {
        try {
            dispatch(setAppStatus('loading'))
            const res = await loginAPI.logOut()
            if(res.data.resultCode === 0) {
                dispatch(setIsLoggedAC(false))
                dispatch(setAppStatus('succeeded'))
            } else {
                handleAppServerError(res.data, dispatch)
            }
        } catch(err) {
            if(axios.isAxiosError(err)) {
                handleServerNetworkError(err.message, dispatch)
            } else {
                handleServerNetworkError((err as Error).message, dispatch)
            }
        }
    }
}

export const setIsInitializedTC = (): ThunkCreatorType => {
    return async (dispatch) => {
        try {
            dispatch(setAppStatus('loading'))
            const res = await loginAPI.getUserData()
            if(res.data.resultCode === 0) {
                dispatch(setAppStatus('succeeded'))
            } else {
                handleAppServerError<UserDataType>(res.data, dispatch)
            }
        } catch (err) {
            if(axios.isAxiosError(err)) {
                handleServerNetworkError(err.message, dispatch)
            } else {
                handleServerNetworkError((err as Error).message, dispatch)
            }
        } finally {
            dispatch(setIsInitializedAC(true))
        }
    }
}