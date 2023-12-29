import { RouterProvider } from 'react-router-dom';
import './App.css';
import { router } from './router/router';
import { ErrorSnackbar } from './components/errorSnackbar/ErrorSnackbar';
import { useSelector } from 'react-redux';
import { AppRootStateType, useAppDispatch } from './store/store';
import { Preloader } from './components/preloader/Preloader';
import { useEffect } from 'react';
import { setIsInitializedAC, setIsInitializedTC } from './reducers/appReducer';

export const App: React.FC = () => {
    const initialized = useSelector<AppRootStateType, boolean>(state => state.app.isInitialized)
    const dispatch = useAppDispatch()
    useEffect(()=>{
        dispatch(setIsInitializedTC())
    }, [])

    if(!initialized) {
        return <Preloader/>
    }
    return (
        <>
            <RouterProvider router={router}/>
            <ErrorSnackbar/>
        </>
    );
}

