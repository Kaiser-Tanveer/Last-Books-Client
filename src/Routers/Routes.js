import { createBrowserRouter } from "react-router-dom";
import AddProducts from "../Components/Pages/AddProducts/AddProducts";
import Advertise from "../Components/Pages/Advertise/Advertise";
import Blog from "../Components/Pages/Blog/Blog";
import AllBuyers from "../Components/Pages/Dashboard/AdminComponents/AllBuyers";
import AllSellers from "../Components/Pages/Dashboard/AdminComponents/AllSellers";
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
            {
                path: '/dashboard/payments/:id',
                element: <Payment />,
                loader: ({ params }) => fetch(`https://used-books-server.vercel.app/bookings/${params.id}`)
            },
            {
                path: '/dashboard/myProducts',
                element: <MyProducts />
            },
            {
                path: '/dashboard/addProducts',
                element: <AddProducts />
            },
            {
                path: '/dashboard/users/sellers',
                element: <AllSellers />
            },
            {
                path: '/dashboard/users/buyers',
                element: <AllBuyers />
            },
            {
                path: '/dashboard/reported',
                element: <ReportedItems />
            },
        ]
    },
]);

export default router;