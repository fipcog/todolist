import { RouterProvider } from 'react-router-dom';
import './App.css';
import { router } from './router/router';

export const App: React.FC = () => {

    return (
        <RouterProvider router={router}/>
    );
}

