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
import Testimonials from "../Pages/Home/Testimonials/Testimonials";
import Priceing from "../Pages/Home/Home/Priceing/Priceing";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
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
        element: <ServicesDetail></ServicesDetail>
      },
      {
        path: 'contact',
        element: <Contact></Contact>
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