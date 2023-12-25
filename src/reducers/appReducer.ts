export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
type InitialAppStateType = {
    status: RequestStatusType
    error: string | null
}
const initialAppState: InitialAppStateType = {
    status: 'succeeded',
    error: null
}


export const appReducer = (state: InitialAppStateType = initialAppState, action: MainActionType): InitialAppStateType => {
    switch(action.type) {
        case 'SET_APP_STATUS':
            return {...state, status: action.payload.status}
        case 'SET_APP_ERROR':
            return {...state, error: action.payload.error}
        default:
            return state
    }
}

type MainActionType = SetAppStatus | SetAppErrorType

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
