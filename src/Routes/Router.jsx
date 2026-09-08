import {
  createBrowserRouter,
} from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home/Home";
import About from "../Pages/About/About";
import Services from "../Pages/Services/Services";
import Contact from "../Pages/Contact/Contact";
import Login from "../Pages/Login/Login";
import SignUp from "../Pages/SignUp/SignUp";
import ServicesDetail from "../Pages/Home/ServicesCard/ServicesDetail";
import Testimonials from "../Pages/Testimonials/Testimonials";
import Priceing from "../Pages/Priceing/Priceing";
import Doctors from "../Pages/Doctors/Doctors";
import DoctorsDetail from "../Pages/Doctors/DoctorsDetail";
import Blogs from "../Pages/Blogs/Blogs";
import BlogsDetails from "../Pages/Blogs/BlogsDetails";
import Appointment from "../Pages/Appointment/Appointment";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import Shop from "../Pages/Shop/Shop";
import Cart from "../Pages/Shop/Cart";
import Checkout from "../Pages/Shop/Checkout";
import OrderSuccess from "../Pages/Shop/OrderSuccess";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    errorElement: <ErrorPage></ErrorPage>,
    loader: ErrorPage,
    children:[
      {
        path: '/',
        element: <Home></Home>
      },
      {
        path: 'about',
        element: <About></About>
      },
      {
        path: 'services',
        element: <Services></Services>
      },
      {
        path: 'servicesdetail/:id',
        element: <ServicesDetail></ServicesDetail>,
      },
      {
        path: 'doctors',
        element: <Doctors></Doctors>
      },
      {
        path: 'doctorsdetail/:id',
        element: <DoctorsDetail></DoctorsDetail>
      },
      {
        path: 'contact',
        element: <Contact></Contact>
      },
      {
        path: 'Appointment',
        element: <Appointment></Appointment>
      },
      {
        path:'testimonials',
        element:<Testimonials></Testimonials>
      } ,
      {
        path:'priceing',
        element:<Priceing></Priceing>
      },
      {
        path: 'blogs',
        element: <Blogs></Blogs>
      },
      {
        path: 'blogsdetails/:id',
        element: <BlogsDetails></BlogsDetails>
      },
      {
        path: 'shop',
        element: <Shop></Shop>
      },
      {
        path: 'cart',
        element: <Cart></Cart>
      },
      {
        path: 'checkout',
        element: <Checkout></Checkout>
      },
      {
        path: 'order-success',
        element: <OrderSuccess></OrderSuccess>
      },
      {
        path: 'login',
        element: <Login></Login>
      },
      {
        path: 'signup',
        element: <SignUp></SignUp>
      }
    ]
  },
]);