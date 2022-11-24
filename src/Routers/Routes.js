import { createBrowserRouter } from "react-router-dom";
import Home from "../Components/Pages/Home/Home";
import Register from "../Components/Pages/LogIn/Register";
import Main from "../layout/Main";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Main />,
        children: [
            {
                path: '/',
                element: <Home />
            },
            {
                path: '/register',
                element: <Register />
            },
        ]
    }
]);

export default router;