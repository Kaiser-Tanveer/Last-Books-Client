import { createBrowserRouter } from "react-router-dom";
import AddProducts from "../Components/Pages/AddProducts/AddProducts";
import Advertise from "../Components/Pages/Advertise/Advertise";
import Blog from "../Components/Pages/Blog/Blog";
import AllUser from "../Components/Pages/Dashboard/AdminComponents/AllUser";
import ReportedItems from "../Components/Pages/Dashboard/AdminComponents/ReportedItems";
import MyOrders from "../Components/Pages/Dashboard/BuyerComponents/MyOrders";
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
                path: '/addProducts',
                element: <AddProducts />
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
                path: '/blog',
                element: <Blog />
            },
            {
                path: '/products/:title',
                element: <Products />,
                loader: ({ params }) => fetch(`http://localhost:5000/products/${params.title}`)
            },
            // {
            //     path: '/categories/:title',
            //     element: <Products />,
            //     loader: ({ params }) => fetch(`http://localhost:5000/products/${params.title}`)
            // },
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