import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';

import { ErrorCatch } from '../components/ErrorCatch';
import { store } from '../store';
import { router } from './AppRoutes';

export const App = () => {
    return (
        <ErrorCatch>
            <Provider store={store}>
                <RouterProvider router={router} />
            </Provider>
        </ErrorCatch>
    );
};
