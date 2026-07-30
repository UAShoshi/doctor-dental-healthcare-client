import { Outlet, useLocation } from "react-router-dom";
import Footer from "../Shared/Footer/Footer";
import NavBar from "../Shared/NavBar/NavBar";


const Main = () => {
    const location = useLocation();
    console.log(location);
    const noFooter = location.pathname.includes('login') || location.pathname.includes('signup')
     
    return (
        <div>
            <NavBar></NavBar>
            <Outlet></Outlet>
            {noFooter || <Footer></Footer>}
        </div>
    );
};

export default Main;