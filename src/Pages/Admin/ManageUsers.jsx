import { useEffect, useState } from "react";

const ManageUsers = () => {

  const [users, setUsers] = useState([]);

  useEffect(() => {

    fetch("/admindata/users.json")
      .then(res => res.json())
      .then(data => {
        setUsers(data);
      })
      .catch(error => {
        console.log(error);
      });

  }, []);

  return (
    <div>

      {/* Heading */}
      <div className="mb-8">

        <h2 className="text-3xl font-bold text-gray-800">
          Manage Users
        </h2>

        <p className="text-gray-500 mt-2">
          View and manage all registered users.
        </p>

      </div>


      {/* User Count */}
      <div className="bg-white rounded-2xl border shadow-sm p-6 mb-6">

        <p className="text-gray-500">
          Total Registered Users
        </p>

        <h3 className="text-3xl font-bold mt-2">
          {users.length}
        </h3>

      </div>


      {/* Users Table */}
      <div className="bg-white rounded-2xl border shadow-sm overflow-hidden">

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead className="bg-gray-50">

              <tr>
                <th className="text-left p-4">User</th>
                <th className="text-left p-4">Email</th>
                <th className="text-left p-4">Phone</th>
                <th className="text-left p-4">Role</th>
                <th className="text-left p-4">Address</th>
              </tr>

            </thead>

            <tbody>

              {users.map(user => (

                <tr
                  key={user._id}
                  className="border-t hover:bg-gray-50"
                >

                  {/* User */}
                  <td className="p-4">

                    <div className="flex items-center gap-3">

                      <div className="w-11 h-11 rounded-full bg-[#eeeaff] flex items-center justify-center">
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


                  {/* Email */}
                  <td className="p-4 text-gray-600">
                    {user.email}
                  </td>


                  {/* Phone */}
                  <td className="p-4 text-gray-600">
                    {user.phone}
                  </td>


                  {/* Role */}
                  <td className="p-4">

                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        user.role === "admin"
                          ? "bg-purple-100 text-purple-700"
                          : "bg-blue-100 text-blue-700"
                      }`}
                    >
                      {user.role}
                    </span>

                  </td>


                  {/* Address */}
                  <td className="p-4 text-gray-600">
                    {user.address}
                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
};

export default ManageUsers;