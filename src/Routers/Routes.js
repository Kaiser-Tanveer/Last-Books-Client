import { createBrowserRouter } from "react-router-dom";
import Advertise from "../Components/Pages/Advertise/Advertise";
import AllUser from "../Components/Pages/Dashboard/AdminComponents/AllUser";
import ReportedItems from "../Components/Pages/Dashboard/AdminComponents/ReportedItems";
import MyOrders from "../Components/Pages/Dashboard/BuyerComponents/MyOrders";
import Report from "../Components/Pages/Dashboard/BuyerComponents/Report";
import Home from "../Components/Pages/Home/Home";
import Register from "../Components/Pages/LogIn/Register";
import SignIn from "../Components/Pages/LogIn/SignIn";
import NotFound from "../Components/Pages/NotFound/NotFound";
import Products from "../Components/Pages/Products/Products";
import DashboardLayout from "../layout/DashboardLayout";
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
                path: '/advertise',
                element: <Advertise />
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
        element: <PrivateRoute><DashboardLayout /></PrivateRoute>,
        children: [
            {
                path: '/dashboard',
                element: <MyOrders />
            },
            {
                path: '/dashboard/myOrders',
                element: <MyOrders />
            },
            {
                path: '/dashboard/report',
                element: <Report />
            },
            {
                path: '/dashboard/allUsers',
                element: <AllUser />
            },
            {
                path: '/dashboard/reported',
                element: <ReportedItems />
            },
        ]
    },
]);

export default router;