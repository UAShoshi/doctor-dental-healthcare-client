import { Link } from "react-router-dom";



const NavBar = () => {
  const navOption = <>
    <li><Link to={"/"}>Home</Link></li>
    <li><Link to={"/about"}>About</Link></li>
    <li><Link to={"/services"}>Services</Link></li>
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
    <li><Link to={"/contact"}>Contact</Link></li>
  </>
  return (
    <>
      <div className="navbar shadow-sm bg-base-100 fixed z-10 font-bold">
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
          <a className="btn font-bold">Button</a>
        </div>
      </div>
    </>
  );
};

export default NavBar;