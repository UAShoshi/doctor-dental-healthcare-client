import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../../Provider/AuthProvider";



const NavBar = () => {

  const { user, logOut } = useContext(AuthContext);
  const handleLogOut = () => {
    logOut()
      .than(() => { })
      .catch(error => console.log(error));

  }

  const navOption = <>
    <li><NavLink to={"/"}>Home</NavLink></li>
    <li><NavLink to={"/about"}>About</NavLink></li>
    <li><NavLink to={"/services"}>Services</NavLink></li>
    <li>
      <details>
        <summary>Pages</summary>
        <ul className="p-2 bg-base-100 w-40 z-1">
          <li><a>Team</a></li>
          <li><a>Pricing</a></li>
          <li><a>Testimonial</a></li>
          <li><a>Faq</a></li>
          <li><a>404</a></li>
        </ul>
      </details>
    </li>
    <li><a>Blog</a></li>
    <li><NavLink to={"/contact"}>Contact</NavLink></li>
  </>
  return (
    <>
      <div className="navbar shadow-sm bg-base-100 fixed z-10 container mx-auto font-bold">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
            </div>
            <ul
              tabIndex="-1"
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
              {navOption}
            </ul>
          </div>
          <a className="btn btn-ghost text-xl">DentCare Hub</a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            {navOption}
          </ul>
        </div>
        <div className="navbar-end">

          {
            user ? <>
                  <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                      <div className="w-10 rounded-full">
                        <img
                          alt="Tailwind CSS Navbar component"
                          src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                      </div>
                    </div>
                    <ul
                      tabIndex="-1"
                      className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                      <li><a><NavLink to={"/my-profile"}>My Profile</NavLink></a></li>
                      <li><a><NavLink to={"/my-appointments"}>My Appointments</NavLink></a></li>
                      <li><a onClick={handleLogOut}>LogOut</a></li>
                    </ul>
                  </div>
            </> : <>
              <a className="btn font-bold bg-[#5F6FFF] text-white lg:btn-md btn-sm rounded-3xl hover:bg-[#434fbe]"><Link to={"/login"}>
                Create Account</Link></a></>
          }
        </div>
      </div>
    </>
  );
};

export default NavBar;