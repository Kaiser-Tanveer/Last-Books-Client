import { createBrowserRouter } from "react-router-dom";
import AddProducts from "../Components/Pages/AddProducts/AddProducts";
import Advertise from "../Components/Pages/Advertise/Advertise";
import Blog from "../Components/Pages/Blog/Blog";
import AllUser from "../Components/Pages/Dashboard/AdminComponents/AllUser";
import ReportedItems from "../Components/Pages/Dashboard/AdminComponents/ReportedItems";
import MyOrders from "../Components/Pages/Dashboard/BuyerComponents/MyOrders";
import MyProducts from "../Components/Pages/Dashboard/SellerComponents/MyProducts";
import Home from "../Components/Pages/Home/Home";
import Register from "../Components/Pages/LogIn/Register";
import SignIn from "../Components/Pages/LogIn/SignIn";
import NotFound from "../Components/Pages/NotFound/NotFound";
import Products from "../Components/Pages/Products/Products";
import DashboardLayout from "../layout/DashboardLayout";
import Main from "../layout/Main";
import AdminRoute from "./AdminRoute/AdminRoute";
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
                path: '/blog',
                element: <Blog />
            },
            {
                path: '/products/:titleName',
                element: <Products />,
                loader: ({ params }) => fetch(`http://localhost:5000/products/${params.titleName}`)
            },
        ]
    },
    {
        path: '/dashboard',
        element: <PrivateRoute><DashboardLayout /></PrivateRoute>,
        children: [
            {
                path: '/dashboard',
                element: <PrivateRoute><MyOrders /></PrivateRoute>
            },
            {
                path: '/dashboard/myOrders',
                element: <MyOrders />
            },
            {
                path: '/dashboard/myProducts',
                element: <MyProducts />
            },
            {
                path: '/dashboard/allUsers',
                element: <AllUser />
            },
            {
                path: '/dashboard/addProducts',
                element: <AdminRoute><AddProducts /></AdminRoute>
            },
            {
                path: '/dashboard/reported',
                element: <AdminRoute><ReportedItems /></AdminRoute>
            },
        ]
    },
]);

export default router;