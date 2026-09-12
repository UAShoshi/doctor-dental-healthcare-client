import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";

const Admin = () => {
  const { logOut } = useContext(AuthContext);
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
            Admin Panel
          </p>
        </div>

        {/* Menu */}
        <div className="p-4">

          <p className="text-xs font-semibold text-gray-400 uppercase mb-3">
            Admin Menu
          </p>

          <ul className="space-y-2">

            <li>
              <NavLink
                to="/admin"
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

            <li>
              <NavLink
                to="/admin/users"
                className={({ isActive }) =>
                  `block px-4 py-3 rounded-lg font-medium ${
                    isActive
                      ? "bg-[#5F6FFF] text-white border-0"
                      : "text-gray-600 hover:bg-gray-100"
                  }`
                }
              >
                👥 Manage Users
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/admin/doctors"
                className={({ isActive }) =>
                  `block px-4 py-3 rounded-lg font-medium ${
                    isActive
                      ? "bg-[#5F6FFF] text-white border-0"
                      : "text-gray-600 hover:bg-gray-100"
                  }`
                }
              >
                👨‍⚕️ Manage Doctors
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/admin/manage-appointments-orders"
                className={({ isActive }) =>
                  `block px-4 py-3 rounded-lg font-medium ${
                    isActive
                      ? "bg-[#5F6FFF] text-white border-0"
                      : "text-gray-600 hover:bg-gray-100"
                  }`
                }
              >
                📅 Appointments & Orders
              </NavLink>
            </li>

          </ul>

          <div className="border-t mt-6 pt-4">

            <Link
              to="/"
              className="block px-4 py-3 rounded-lg text-gray-600 hover:bg-gray-100"
            >
              🏠 Home
            </Link>

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
              Admin Dashboard
            </h1>

            <p className="text-sm text-gray-500">
              Manage your DentalCare website
            </p>
          </div>

          <div className="flex items-center gap-3">

            <div className="text-right hidden sm:block">
              <p className="font-semibold">
                DentalCare Admin
              </p>

              <p className="text-xs text-gray-500">
                Administrator
              </p>
            </div>

            <div className="w-11 h-11 rounded-full bg-[#eeeaff] flex items-center justify-center text-xl">
              👑
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

export default Admin;