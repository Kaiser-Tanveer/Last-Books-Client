import { createBrowserRouter } from "react-router-dom";
import MyOrders from "../Components/Pages/Dashboard/BuyerRoutes/MyOrders";
import Home from "../Components/Pages/Home/Home";
import Register from "../Components/Pages/LogIn/Register";
import SignIn from "../Components/Pages/LogIn/SignIn";
import NotFound from "../Components/Pages/NotFound/NotFound";
import Products from "../Components/Pages/Products/Products";
import DashboardLayout from "../layout/DashboardLayout";
import Main from "../layout/Main";

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
                element: <Products />,
                loader: ({ params }) => fetch(`http://localhost:5000/categories/${params.id}`)
            },
        ]
    },
    {
        path: '/dashboard',
        element: <DashboardLayout />,
        children: [
            {
                path: '/dashboard',
                element: <MyOrders />
            },
            {
                path: '/dashboard/myOrders',
                element: <MyOrders />
            },
        ]
    },
]);

export default router;