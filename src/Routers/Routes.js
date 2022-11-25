import { createBrowserRouter } from "react-router-dom";
import Home from "../Components/Pages/Home/Home";
import Register from "../Components/Pages/LogIn/Register";
import SignIn from "../Components/Pages/LogIn/SignIn";
import NotFound from "../Components/Pages/NotFound/NotFound";
import Products from "../Components/Pages/Products/Products";
import Main from "../layout/Main";
import PrivateRoute from "./PrivateRoute/PrivateRoute";

const router = createBrowserRouter([

    {
        path: '*',
        element: <NotFound />
    },
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
            {
                path: '/logIn',
                element: <SignIn />
            },
            {
                path: '/categories/:id',
                element: <PrivateRoute><Products /></PrivateRoute>,
                loader: ({ params }) => fetch(`http://localhost:5000/categories/${params.id}`)
            },
        ]
    }
]);

export default router;