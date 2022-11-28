import { createBrowserRouter } from "react-router-dom";
import AddProducts from "../Components/Pages/AddProducts/AddProducts";
import Advertise from "../Components/Pages/Advertise/Advertise";
import Blog from "../Components/Pages/Blog/Blog";
import AllUser from "../Components/Pages/Dashboard/AdminComponents/AllUser";
import ReportedItems from "../Components/Pages/Dashboard/AdminComponents/ReportedItems";
import MyOrders from "../Components/Pages/Dashboard/BuyerComponents/MyOrders";
import Payment from "../Components/Pages/Dashboard/Payment/Payment";
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
import SellerRoute from "./SellerRoute/SellerRoute";

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
                loader: ({ params }) => fetch(`https://used-books-server.vercel.app/products/${params.titleName}`)
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
                path: '/dashboard/payments/:id',
                element: <Payment />,
                loader: ({ params }) => fetch(`https://used-books-server.vercel.app/bookings/${params.id}`)
            },
            {
                path: '/dashboard/myProducts',
                element: <SellerRoute><MyProducts /></SellerRoute>
            },
            {
                path: '/dashboard/addProducts',
                element: <SellerRoute><AddProducts /></SellerRoute>
            },
            {
                path: '/dashboard/allUsers',
                element: <AdminRoute><AllUser /></AdminRoute>
            },
            {
                path: '/dashboard/reported',
                element: <AdminRoute><ReportedItems /></AdminRoute>
            },
        ]
    },
]);

export default router;