import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const response = await fetch("/admindata/users.json");
        const jsonUsers = await response.json();

        const localUsers =
          JSON.parse(localStorage.getItem("users")) || [];

        const deletedUserIds =
          JSON.parse(
            localStorage.getItem("deletedUserIds")
          ) || [];

        const userMap = new Map();

        // JSON users
        jsonUsers.forEach((user) => {
          userMap.set(user._id, user);
        });

        // LocalStorage users
        localUsers.forEach((user) => {
          userMap.set(user._id, user);
        });

        // Remove deleted users
        deletedUserIds.forEach((id) => {
          userMap.delete(id);
        });

        const allUsers = Array.from(userMap.values());

        setUsers(allUsers);
      } catch (error) {
        console.log("Users loading error:", error);
      }
    };

    loadUsers();
  }, []);

  // ================= ROLE CHANGE =================

  const handleRoleChange = (id, newRole) => {
    const updatedUsers = users.map((user) =>
      user._id === id
        ? { ...user, role: newRole }
        : user
    );

    setUsers(updatedUsers);

    const localUsers =
      JSON.parse(localStorage.getItem("users")) || [];

    const existingUser = localUsers.some(
      (user) => user._id === id
    );

    let updatedLocalUsers;

    if (existingUser) {
      updatedLocalUsers = localUsers.map((user) =>
        user._id === id
          ? { ...user, role: newRole }
          : user
      );
    } else {
      const changedUser = users.find(
        (user) => user._id === id
      );

      updatedLocalUsers = [
        ...localUsers,
        {
          ...changedUser,
          role: newRole,
        },
      ];
    }

    localStorage.setItem(
      "users",
      JSON.stringify(updatedLocalUsers)
    );

    Swal.fire({
      icon: "success",
      title: "Role Updated",
      text: `User role changed to ${newRole}`,
      timer: 1200,
      showConfirmButton: false,
    });
  };

  // ================= DELETE USER =================

  const handleDeleteUser = (id) => {
    Swal.fire({
      title: "Delete User?",
      text: "This user will be removed permanently from this browser.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, Delete",
    }).then((result) => {
      if (result.isConfirmed) {
        // Remove from UI
        const updatedUsers = users.filter(
          (user) => user._id !== id
        );

        setUsers(updatedUsers);

        // Remove from localStorage users
        const localUsers =
          JSON.parse(localStorage.getItem("users")) || [];

        const updatedLocalUsers = localUsers.filter(
          (user) => user._id !== id
        );

        localStorage.setItem(
          "users",
          JSON.stringify(updatedLocalUsers)
        );

        // Save deleted user ID
        const deletedUserIds =
          JSON.parse(
            localStorage.getItem("deletedUserIds")
          ) || [];

        if (!deletedUserIds.includes(id)) {
          deletedUserIds.push(id);
        }

        localStorage.setItem(
          "deletedUserIds",
          JSON.stringify(deletedUserIds)
        );

        Swal.fire({
          icon: "success",
          title: "Deleted!",
          text: "User has been deleted.",
          timer: 1200,
          showConfirmButton: false,
        });
      }
    });
  };

  // ================= SEARCH + FILTER =================

  const filteredUsers = users.filter((user) => {
    const searchText = search.toLowerCase();

    const matchesSearch =
      user.name?.toLowerCase().includes(searchText) ||
      user.email?.toLowerCase().includes(searchText) ||
      user.phone?.toLowerCase().includes(searchText);

    const matchesRole =
      roleFilter === "All" ||
      user.role === roleFilter;

    return matchesSearch && matchesRole;
  });

  return (
    <div>

      {/* ================= HEADING ================= */}

      <div className="mb-8">

        <h2 className="text-3xl font-bold text-gray-800">
          Manage Users
        </h2>

        <p className="text-gray-500 mt-2">
          View and manage all registered users.
        </p>

      </div>


      {/* ================= USER COUNT ================= */}

      <div className="bg-white rounded-2xl border shadow-sm p-6 mb-6">

        <div className="flex items-center justify-between">

          <div>

            <p className="text-gray-500">
              Total Registered Users
            </p>

            <h3 className="text-3xl font-bold mt-2">
              {users.length}
            </h3>

          </div>

          <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center text-2xl">
            👥
          </div>

        </div>

      </div>


      {/* ================= SEARCH + FILTER ================= */}

      <div className="bg-white rounded-2xl border shadow-sm p-5 mb-6">

        <div className="flex flex-col md:flex-row gap-4">

          <div className="flex-1">

            <input
              type="text"
              placeholder="Search by name, email or phone..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="input input-bordered w-full"
            />

          </div>


          <div>

            <select
              value={roleFilter}
              onChange={(e) =>
                setRoleFilter(e.target.value)
              }
              className="select select-bordered w-full md:w-40"
            >

              <option value="All">
                All Roles
              </option>

              <option value="user">
                User
              </option>

              <option value="admin">
                Admin
              </option>

            </select>

          </div>

        </div>

      </div>


      {/* ================= USERS TABLE ================= */}

      <div className="bg-white rounded-2xl border shadow-sm overflow-hidden">

        <div className="p-6 border-b">

          <h3 className="text-xl font-bold text-gray-800">
            Users List
          </h3>

          <p className="text-sm text-gray-500 mt-1">
            Showing {filteredUsers.length} user(s)
          </p>

        </div>


        <div className="overflow-x-auto">

          <table className="w-full">

            <thead className="bg-gray-50">

              <tr>

                <th className="text-left p-4">
                  User
                </th>

                <th className="text-left p-4">
                  Email
                </th>

                <th className="text-left p-4">
                  Phone
                </th>

                <th className="text-left p-4">
                  Role
                </th>

                <th className="text-left p-4">
                  Address
                </th>

                <th className="text-left p-4">
                  Action
                </th>

              </tr>

            </thead>


            <tbody>

              {filteredUsers.length === 0 ? (

                <tr>

                  <td
                    colSpan="6"
                    className="text-center p-10 text-gray-500"
                  >
                    No users found.
                  </td>

                </tr>

              ) : (

                filteredUsers.map((user) => (

                  <tr
                    key={user._id}
                    className="border-t hover:bg-gray-50"
                  >

                    {/* USER */}

                    <td className="p-4">

                      <div className="flex items-center gap-3">

                        <div className="w-11 h-11 rounded-full bg-[#eeeaff] flex items-center justify-center text-xl">
                          👤
                        </div>

                        <div>

                          <p className="font-semibold">
                            {user.name}
                          </p>

                          <p className="text-xs text-gray-500">
                            ID: {user._id}
                          </p>

                        </div>

                      </div>

                    </td>


                    {/* EMAIL */}

                    <td className="p-4 text-gray-600">
                      {user.email}
                    </td>


                    {/* PHONE */}

                    <td className="p-4 text-gray-600">
                      {user.phone || "N/A"}
                    </td>


                    {/* ROLE */}

                    <td className="p-4">

                      <select
                        value={user.role || "user"}
                        onChange={(e) =>
                          handleRoleChange(
                            user._id,
                            e.target.value
                          )
                        }
                        className={`select select-bordered select-sm ${
                          user.role === "admin"
                            ? "text-purple-700"
                            : "text-blue-700"
                        }`}
                      >

                        <option value="user">
                          User
                        </option>

                        <option value="admin">
                          Admin
                        </option>

                      </select>

                    </td>


                    {/* ADDRESS */}

                    <td className="p-4 text-gray-600">
                      {user.address || "N/A"}
                    </td>


                    {/* ACTION */}

                    <td className="p-4">

                      <button
                        onClick={() =>
                          handleDeleteUser(user._id)
                        }
                        className="px-4 py-2 rounded-lg bg-red-50 text-red-600 font-semibold hover:bg-red-100 transition"
                      >
                        Delete
                      </button>

                    </td>

                  </tr>

                ))

              )}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
};

export default ManageUsers;