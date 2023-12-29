import { Dispatch } from "redux"
import { setAppError, setAppStatus } from "../reducers/appReducer"
import { ResponseType } from "../API/todolistAPI"
import axios from "axios"

export const handleServerNetworkError = (message: string, dispatch: Dispatch) => {
    dispatch(setAppStatus('failed'))
    dispatch(setAppError(message))
}

export const handleAppServerError = <T>(resData: ResponseType<T>, dispatch: Dispatch) => {
    if(resData.messages.length > 0) {
        dispatch(setAppError(resData.messages[0]))
    } else {
        dispatch(setAppError('Some error occurred'))
    }
    dispatch(setAppStatus('failed'))
}