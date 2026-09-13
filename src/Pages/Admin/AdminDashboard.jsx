import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        // =========================================
        // Load Users, Doctors & Appointments
        // =========================================
        const [
          usersRes,
          doctorsRes,
          appointmentsRes,
        ] = await Promise.all([
          fetch("/admindata/users.json"),
          fetch("/admindata/doctors.json"),
          fetch("/admindata/appointments.json"),
        ]);

        const usersData = await usersRes.json();
        const doctorsData = await doctorsRes.json();
        const appointmentsData =
          await appointmentsRes.json();

        // =========================================
        // Users: JSON + LocalStorage
        // =========================================
        const localUsers =
          JSON.parse(
            localStorage.getItem("users")
          ) || [];

        const deletedUserIds =
          JSON.parse(
            localStorage.getItem("deletedUserIds")
          ) || [];

        const userMap = new Map();

        usersData.forEach((user) => {
          userMap.set(user._id, user);
        });

        localUsers.forEach((user) => {
          userMap.set(user._id, user);
        });

        deletedUserIds.forEach((id) => {
          userMap.delete(id);
        });

        const dynamicUsers =
          Array.from(userMap.values());

        // =========================================
        // Doctors: JSON + LocalStorage
        // =========================================
        const localDoctors =
          JSON.parse(
            localStorage.getItem("doctors")
          ) || [];

        const deletedDoctorIds =
          JSON.parse(
            localStorage.getItem("deletedDoctorIds")
          ) || [];

        const doctorMap = new Map();

        doctorsData.forEach((doctor) => {
          doctorMap.set(doctor._id, doctor);
        });

        localDoctors.forEach((doctor) => {
          doctorMap.set(doctor._id, doctor);
        });

        deletedDoctorIds.forEach((id) => {
          doctorMap.delete(id);
        });

        const dynamicDoctors =
          Array.from(doctorMap.values());

        // =========================================
        // Appointments: JSON + LocalStorage
        // =========================================
        const localAppointments =
          JSON.parse(
            localStorage.getItem("appointments")
          ) || [];

        const appointmentMap = new Map();

        appointmentsData.forEach((appointment) => {
          appointmentMap.set(
            appointment._id,
            appointment
          );
        });

        localAppointments.forEach((appointment) => {
          appointmentMap.set(
            appointment._id,
            appointment
          );
        });

        // =========================================
        // Appointment Status
        // =========================================
        const appointmentStatuses =
          JSON.parse(
            localStorage.getItem(
              "appointmentStatuses"
            )
          ) || {};

        const dynamicAppointments =
          Array.from(
            appointmentMap.values()
          ).map((appointment) => ({
            ...appointment,
            status:
              appointmentStatuses[
                appointment._id
              ] ||
              appointment.status ||
              "Pending",
          }));

        // =========================================
        // Orders From LocalStorage
        // =========================================
        const ordersData =
          JSON.parse(
            localStorage.getItem("orders")
          ) || [];

        // =========================================
        // Set Dashboard Data
        // =========================================
        setUsers(dynamicUsers);
        setDoctors(dynamicDoctors);
        setAppointments(dynamicAppointments);
        setOrders(ordersData);
      } catch (error) {
        console.log(
          "Dashboard Error:",
          error
        );
      }
    };

    loadDashboardData();
  }, []);

  // =========================================
  // Appointment Status Change
  // =========================================
  const handleAppointmentStatusChange = (
    appointmentId,
    newStatus
  ) => {
    const appointmentStatuses =
      JSON.parse(
        localStorage.getItem(
          "appointmentStatuses"
        )
      ) || {};

    const updatedStatuses = {
      ...appointmentStatuses,
      [appointmentId]: newStatus,
    };

    localStorage.setItem(
      "appointmentStatuses",
      JSON.stringify(updatedStatuses)
    );

    setAppointments((prevAppointments) =>
      prevAppointments.map((appointment) =>
        appointment._id === appointmentId
          ? {
              ...appointment,
              status: newStatus,
            }
          : appointment
      )
    );

    Swal.fire({
      icon: "success",
      title: "Status Updated",
      text: `Appointment status changed to ${newStatus}`,
      timer: 1500,
      showConfirmButton: false,
    });
  };

  // =========================================
  // Order Status Change
  // =========================================
  const handleOrderStatusChange = (
    orderId,
    newStatus
  ) => {
    const updatedOrders = orders.map(
      (order) =>
        order._id === orderId
          ? {
              ...order,
              status: newStatus,
            }
          : order
    );

    localStorage.setItem(
      "orders",
      JSON.stringify(updatedOrders)
    );

    setOrders(updatedOrders);

    Swal.fire({
      icon: "success",
      title: "Order Status Updated",
      text: `Order status changed to ${newStatus}`,
      timer: 1500,
      showConfirmButton: false,
    });
  };

  // =========================================
  // Total Revenue
  // =========================================
  const totalRevenue = orders.reduce(
    (total, order) =>
      total + Number(order.total || 0),
    0
  );

  // =========================================
  // Pending Appointments
  // =========================================
  const pendingAppointments =
    appointments.filter(
      (appointment) =>
        appointment.status === "Pending"
    ).length;

  // =========================================
  // Delivered Orders
  // =========================================
  const deliveredOrders =
    orders.filter(
      (order) =>
        order.status === "Delivered"
    ).length;

  return (
    <div>
      {/* Welcome Section */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-800">
          Welcome, Admin 👋
        </h2>

        <p className="text-gray-500 mt-2">
          Here's what's happening with your DentalCare website.
        </p>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Users */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-500">
                Total Users
              </p>

              <h3 className="text-3xl font-bold mt-2">
                {users.length}
              </h3>
            </div>

            <div className="w-14 h-14 rounded-xl bg-blue-100 flex items-center justify-center text-2xl">
              👥
            </div>
          </div>
        </div>

        {/* Doctors */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-500">
                Total Doctors
              </p>

              <h3 className="text-3xl font-bold mt-2">
                {doctors.length}
              </h3>
            </div>

            <div className="w-14 h-14 rounded-xl bg-green-100 flex items-center justify-center text-2xl">
              👨‍⚕️
            </div>
          </div>
        </div>

        {/* Appointments */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-500">
                Appointments
              </p>

              <h3 className="text-3xl font-bold mt-2">
                {appointments.length}
              </h3>
            </div>

            <div className="w-14 h-14 rounded-xl bg-purple-100 flex items-center justify-center text-2xl">
              📅
            </div>
          </div>
        </div>

        {/* Revenue */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-500">
                Total Revenue
              </p>

              <h3 className="text-3xl font-bold mt-2">
                ৳{totalRevenue}
              </h3>
            </div>

            <div className="w-14 h-14 rounded-xl bg-yellow-100 flex items-center justify-center text-2xl">
              💰
            </div>
          </div>
        </div>
      </div>

      {/* Second Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        {/* Pending Appointment */}
        <div className="bg-white rounded-2xl border shadow-sm p-6">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-500">
                Pending Appointments
              </p>

              <h3 className="text-2xl font-bold mt-2">
                {pendingAppointments}
              </h3>
            </div>

            <div className="text-3xl">
              ⏳
            </div>
          </div>
        </div>

        {/* Delivered Orders */}
        <div className="bg-white rounded-2xl border shadow-sm p-6">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-500">
                Delivered Orders
              </p>

              <h3 className="text-2xl font-bold mt-2">
                {deliveredOrders}
              </h3>
            </div>

            <div className="text-3xl">
              📦
            </div>
          </div>
        </div>
      </div>

      {/* Recent Appointments */}
      <div className="bg-white rounded-2xl shadow-sm border mt-8">
        <div className="p-6 border-b">
          <h3 className="text-xl font-bold">
            Recent Appointments
          </h3>

          <p className="text-sm text-gray-500 mt-1">
            Latest customer appointments
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left p-4">
                  Doctor
                </th>

                <th className="text-left p-4">
                  Service
                </th>

                <th className="text-left p-4">
                  Date
                </th>

                <th className="text-left p-4">
                  Status
                </th>
              </tr>
            </thead>

            <tbody>
              {appointments
                .slice(0, 5)
                .map((appointment) => (
                  <tr
                    key={appointment._id}
                    className="border-t"
                  >
                    <td className="p-4 font-semibold">
                      {appointment.doctorName}
                    </td>

                    <td className="p-4 text-gray-600">
                      {appointment.serviceName}
                    </td>

                    <td className="p-4 text-gray-600">
                      {appointment.date}
                    </td>

                    <td className="p-4">
                      <select
                        value={
                          appointment.status ||
                          "Pending"
                        }
                        onChange={(e) =>
                          handleAppointmentStatusChange(
                            appointment._id,
                            e.target.value
                          )
                        }
                        className={`select select-sm select-bordered font-semibold ${
                          appointment.status ===
                          "Confirmed"
                            ? "bg-green-100 text-green-700"
                            : appointment.status ===
                              "Pending"
                            ? "bg-yellow-100 text-yellow-700"
                            : appointment.status ===
                              "Completed"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        <option value="Pending">
                          Pending
                        </option>

                        <option value="Confirmed">
                          Confirmed
                        </option>

                        <option value="Completed">
                          Completed
                        </option>

                        <option value="Cancelled">
                          Cancelled
                        </option>
                      </select>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-2xl shadow-sm border mt-8">
        <div className="p-6 border-b">
          <h3 className="text-xl font-bold">
            Recent Orders
          </h3>

          <p className="text-sm text-gray-500 mt-1">
            Latest shop orders
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left p-4">
                  Order ID
                </th>

                <th className="text-left p-4">
                  Date
                </th>

                <th className="text-left p-4">
                  Products
                </th>

                <th className="text-left p-4">
                  Total
                </th>

                <th className="text-left p-4">
                  Status
                </th>
              </tr>
            </thead>

            <tbody>
              {orders
                .slice(0, 5)
                .map((order) => (
                  <tr
                    key={order._id}
                    className="border-t"
                  >
                    <td className="p-4 font-semibold">
                      {order.orderId}
                    </td>

                    <td className="p-4 text-gray-600">
                      {order.orderDate}
                    </td>

                    <td className="p-4 text-gray-600">
                      {order.products?.length || 0}{" "}
                      item(s)
                    </td>

                    <td className="p-4 font-semibold">
                      ৳{order.total}
                    </td>

                    <td className="p-4">
                      <select
                        value={
                          order.status ||
                          "Processing"
                        }
                        onChange={(e) =>
                          handleOrderStatusChange(
                            order._id,
                            e.target.value
                          )
                        }
                        className={`select select-sm select-bordered font-semibold ${
                          order.status ===
                          "Delivered"
                            ? "bg-green-100 text-green-700"
                            : order.status ===
                              "Shipped"
                            ? "bg-blue-100 text-blue-700"
                            : order.status ===
                              "Cancelled"
                            ? "bg-red-100 text-red-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        <option value="Processing">
                          Processing
                        </option>

                        <option value="Shipped">
                          Shipped
                        </option>

                        <option value="Delivered">
                          Delivered
                        </option>

                        <option value="Cancelled">
                          Cancelled
                        </option>
                      </select>
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

export default AdminDashboard;