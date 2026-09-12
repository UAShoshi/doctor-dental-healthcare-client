import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";

const Dashboard = () => {
  const { user, logOut } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logOut()
      .then(() => {
        navigate("/login");
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <div className="min-h-screen bg-[#f8fafc]">

      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-screen w-64 bg-white border-r border-gray-200 hidden md:block">

        {/* Logo */}
        <div className="p-6 border-b">
          <h2 className="text-2xl font-bold text-[#5F6FFF]">
            🦷 DentalCare
          </h2>

          <p className="text-sm text-gray-500 mt-1">
            User Dashboard
          </p>
        </div>


        {/* Menu */}
        <div className="p-4">

          <p className="text-xs font-semibold text-gray-400 uppercase mb-3">
            User Menu
          </p>

          <ul className="space-y-2">

            {/* Dashboard */}
            <li>
              <NavLink
                to="/dashboard"
                end
                className={({ isActive }) =>
                  `block px-4 py-3 rounded-lg font-medium ${
                    isActive
                      ? "bg-[#5F6FFF] text-white border-0"
                      : "text-gray-600 hover:bg-gray-100"
                  }`
                }
              >
                📊 Dashboard
              </NavLink>
            </li>


            {/* Appointments */}
            <li>
              <NavLink
                to="/dashboard/myappointments"
                className={({ isActive }) =>
                  `block px-4 py-3 rounded-lg font-medium ${
                    isActive
                      ? "bg-[#5F6FFF] text-white border-0"
                      : "text-gray-600 hover:bg-gray-100"
                  }`
                }
              >
                📅 My Appointments
              </NavLink>
            </li>


            {/* Orders */}
            <li>
              <NavLink
                to="/dashboard/orders"
                className={({ isActive }) =>
                  `block px-4 py-3 rounded-lg font-medium ${
                    isActive
                      ? "bg-[#5F6FFF] text-white border-0"
                      : "text-gray-600 hover:bg-gray-100"
                  }`
                }
              >
                🛒 My Orders
              </NavLink>
            </li>

          </ul>


          {/* Bottom Menu */}
          <div className="border-t mt-6 pt-4">

            {/* Home */}
            <Link
              to="/"
              className="block px-4 py-3 rounded-lg text-gray-600 hover:bg-gray-100"
            >
              🏠 Home
            </Link>


            {/* Logout */}
            <button
              onClick={handleLogout}
              className="w-full text-left px-4 py-3 rounded-lg text-red-500 hover:bg-red-50"
            >
              🚪 Logout
            </button>

          </div>

        </div>

      </aside>


      {/* Main Content */}
      <main className="md:ml-64">

        {/* Header */}
        <header className="bg-white border-b px-6 py-5 flex justify-between items-center">

          <div>

            <h1 className="text-xl font-bold text-gray-800">
              User Dashboard
            </h1>

            <p className="text-sm text-gray-500">
              Manage your appointments and orders
            </p>

          </div>


          {/* User Info */}
          <div className="flex items-center gap-3">

            <div className="text-right hidden sm:block">

              <p className="font-semibold">
                {user?.displayName || "DentalCare User"}
              </p>

              <p className="text-xs text-gray-500">
                Patient
              </p>

            </div>


            <div className="w-11 h-11 rounded-full bg-[#eeeaff] flex items-center justify-center text-xl overflow-hidden">

              {user?.photoURL ? (
                <img
                  src={user.photoURL}
                  alt="User"
                  className="w-full h-full object-cover"
                />
              ) : (
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
              )}

            </div>

          </div>

        </header>


        {/* Page */}
        <section className="p-6">
          <Outlet />
        </section>

      </main>

    </div>
  );
};

export default Dashboard;