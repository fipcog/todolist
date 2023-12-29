import { RouterProvider } from 'react-router-dom';
import './App.css';
import { router } from './router/router';
import { ErrorSnackbar } from './components/errorSnackbar/ErrorSnackbar';

export const App: React.FC = () => {

    return (
        <>
            <RouterProvider router={router}/>
            <ErrorSnackbar/>
        </>
    );
}

