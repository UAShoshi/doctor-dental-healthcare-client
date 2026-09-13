import { useContext, useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../../Provider/AuthProvider";
import dentCareLogo from "../../assets/author/dentCare-logo.jpg";

const NavBar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    if (!user?.email) {
      return;
    }

    const loadUserRole = async () => {
      try {
        const response = await fetch("/data/users.json");
        const data = await response.json();

        const foundUser = data.find(
          (item) => item.email === user.email
        );

        setCurrentUser(foundUser || null);
      } catch (error) {
        console.log("User role error:", error);
        setCurrentUser(null);
      }
    };

    loadUserRole();
  }, [user]);

  const handleLogOut = () => {
    logOut()
      .then(() => { })
      .catch((error) => console.log(error));
  };

  const navLinkClass = ({ isActive }) =>
    `block px-4 py-2.5 rounded-lg font-medium transition-all duration-200 ${isActive
      ? "bg-[#5F6FFF] text-white"
      : "text-gray-600 hover:bg-gray-100 hover:text-[#5F6FFF]"
    }`;

  const dropdownLinkClass = ({ isActive }) =>
    `block w-full px-3 py-2 rounded-lg font-medium transition-all duration-200 ${isActive
      ? "bg-[#5F6FFF] text-white"
      : "text-gray-600 hover:bg-gray-100 hover:text-[#5F6FFF]"
    }`;

  const navOption = (
    <>
      <li>
        <NavLink to="/" end className={navLinkClass}>
          Home
        </NavLink>
      </li>

      <li>
        <NavLink to="/about" className={navLinkClass}>
          About
        </NavLink>
      </li>

      <li>
        <NavLink to="/services" className={navLinkClass}>
          Services
        </NavLink>
      </li>

      <li>
        <details>
          <summary className="px-4 py-2.5 rounded-lg font-medium text-gray-600 hover:bg-gray-100 cursor-pointer">
            Pages
          </summary>

          <ul className="p-2 mt-2 bg-base-100 rounded-xl shadow-lg w-48 space-y-1 z-50">
            <li>
              <NavLink
                to="/doctors"
                className={dropdownLinkClass}
              >
                Our Doctors
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/priceing"
                className={dropdownLinkClass}
              >
                Pricing
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/testimonials"
                className={dropdownLinkClass}
              >
                Testimonials
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/blogs"
                className={dropdownLinkClass}
              >
                Blog
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/appointment"
                className={dropdownLinkClass}
              >
                Appointment
              </NavLink>
            </li>
          </ul>
        </details>
      </li>

      <li>
        <NavLink to="/shop" className={navLinkClass}>
          Shop
        </NavLink>
      </li>

      <li>
        <NavLink to="/contact" className={navLinkClass}>
          Contact
        </NavLink>
      </li>
    </>
  );

  return (
    <div className="navbar shadow-sm bg-base-100 fixed top-0 left-0 right-0 z-50 container mx-auto font-bold">

      {/* Navbar Start */}
      <div className="navbar-start">

        {/* Mobile Menu */}
        <div className="dropdown">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost lg:hidden"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>

          <ul
            tabIndex="-1"
            className="menu menu-sm dropdown-content bg-base-100 rounded-xl z-50 mt-3 w-60 p-3 shadow-lg space-y-1"
          >
            {navOption}
          </ul>
        </div>

        {/* Logo */}
        <Link
          to="/"
          className="btn btn-ghost text-xl font-bold text-[#5F6FFF] flex items-center gap-2"
        >
          <img
            src={dentCareLogo}
            alt="DentCare Logo"
            className="w-6 h-6 object-contain"
          />
          <span>DentCare</span>
        </Link>
      </div>

      {/* Desktop Menu */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal items-center gap-1 px-1">
          {navOption}
        </ul>
      </div>

      {/* Navbar End */}
      <div className="navbar-end">

        {user ? (
          <div className="dropdown dropdown-end">

            {/* Profile Image */}
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img
                  alt="User Profile"
                  src={
                    user?.photoURL ||
                    "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                  }
                />
              </div>
            </div>

            {/* Profile Dropdown */}
            <ul
              tabIndex="-1"
              className="menu menu-sm dropdown-content bg-base-100 rounded-xl z-50 mt-3 w-60 p-3 shadow-lg space-y-1"
            >

              {/* Admin Menu */}
              {currentUser?.role === "admin" ? (
                <>
                  <li>
                    <NavLink
                      to="/admin"
                      end
                      className={dropdownLinkClass}
                    >
                      🛠️ Admin Dashboard
                    </NavLink>
                  </li>

                  <li>
                    <NavLink
                      to="/admin/users"
                      className={dropdownLinkClass}
                    >
                      👥 Manage Users
                    </NavLink>
                  </li>

                  <li>
                    <NavLink
                      to="/admin/doctors"
                      className={dropdownLinkClass}
                    >
                      👨‍⚕️ Manage Doctors
                    </NavLink>
                  </li>

                  <li>
                    <NavLink
                      to="/admin/manage-appointments-orders"
                      className={dropdownLinkClass}
                    >
                      📅 Appointments & Orders
                    </NavLink>
                  </li>
                </>
              ) : (
                /* User Menu */
                <>
                  <li>
                    <NavLink
                      to="/dashboard"
                      end
                      className={dropdownLinkClass}
                    >
                      📊 My Dashboard
                    </NavLink>
                  </li>

                  <li>
                    <NavLink
                      to="/dashboard/myappointments"
                      className={dropdownLinkClass}
                    >
                      📅 My Appointments
                    </NavLink>
                  </li>

                  <li>
                    <NavLink
                      to="/dashboard/orders"
                      className={dropdownLinkClass}
                    >
                      🛒 My Orders
                    </NavLink>
                  </li>
                </>
              )}

              {/* Logout */}
              <li>
                <button
                  onClick={handleLogOut}
                  className="w-full text-left px-3 py-2 rounded-lg font-medium text-gray-600 hover:bg-red-50 hover:text-red-500 transition-all duration-200"
                >
                  🚪 Logout
                </button>
              </li>
            </ul>
          </div>
        ) : (
          /* Login Button */
          <Link
            to="/login"
            className="btn font-bold bg-[#5F6FFF] text-white lg:btn-md btn-sm rounded-3xl hover:bg-[#434fbe]"
          >
            Create Account
          </Link>
        )}
      </div>
    </div>
  );
};

export default NavBar;