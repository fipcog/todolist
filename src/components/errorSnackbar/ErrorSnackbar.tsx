import React, { useState } from 'react'
import Snackbar from '@mui/material/Snackbar'
import MuiAlert, { AlertProps } from '@mui/material/Alert'
import { useSelector } from 'react-redux'
import { AppRootStateType, useAppDispatch } from '../../store/store'
import { setAppError } from '../../reducers/appReducer'

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />
})

export function ErrorSnackbar() {
    const error = useSelector<AppRootStateType, string|null>((state)=> state.app.error)
    const dispatch = useAppDispatch()



    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return
        }
        dispatch(setAppError(null))
    }


    return (
        <Snackbar open={!!error} autoHideDuration={6000} onClose={handleClose}>
            <Alert severity='error' sx={{width: '100%'}} onClose={handleClose}>
                {error}
            </Alert>
        </Snackbar>
    )
}