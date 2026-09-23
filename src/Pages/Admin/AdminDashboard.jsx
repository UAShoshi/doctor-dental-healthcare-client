import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [orders, setOrders] = useState([]);

  const [loading, setLoading] = useState(true);

  // =========================
  // Load All Data From MongoDB
  // =========================
  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        setLoading(true);

        const [
          usersRes,
          doctorsRes,
          appointmentsRes,
          ordersRes,
        ] = await Promise.all([
          fetch("http://localhost:5000/admin-users"),
          fetch("http://localhost:5000/admin-doctors"),
          fetch("http://localhost:5000/admin-appointments"),
          fetch("http://localhost:5000/admin-orders"),
        ]);

        if (
          !usersRes.ok ||
          !doctorsRes.ok ||
          !appointmentsRes.ok ||
          !ordersRes.ok
        ) {
          throw new Error("Failed to load dashboard data");
        }

        const usersData = await usersRes.json();
        const doctorsData = await doctorsRes.json();
        const appointmentsData =
          await appointmentsRes.json();
        const ordersData = await ordersRes.json();

        // Users
        setUsers(usersData);

        // Doctors
        setDoctors(doctorsData);

        // Appointments
        const dynamicAppointments =
          appointmentsData.map((appointment) => ({
            ...appointment,
            status: appointment.status || "Pending",
          }));

        setAppointments(dynamicAppointments);

        // Orders
        const dynamicOrders = ordersData.map((order) => ({
          ...order,
          status: order.status || "Processing",
        }));

        setOrders(dynamicOrders);
      } catch (error) {
        console.log("Dashboard Error:", error);

        Swal.fire({
          icon: "error",
          title: "Dashboard Error",
          text: "Failed to load dashboard data.",
        });
      } finally {
        setLoading(false);
      }
    };

    loadDashboardData();
  }, []);

  // =========================
  // Appointment Status Update
  // =========================
  const handleAppointmentStatusChange = async (
    appointmentId,
    newStatus
  ) => {
    try {
      const response = await fetch(
        `http://localhost:5000/admin-appointments/${appointmentId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            status: newStatus,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(
          "Failed to update appointment status"
        );
      }

      const result = await response.json();

      console.log("Appointment updated:", result);

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
    } catch (error) {
      console.log(
        "Appointment status update error:",
        error
      );

      Swal.fire({
        icon: "error",
        title: "Update Failed",
        text: "Could not update appointment status.",
      });
    }
  };

  // =========================
  // Order Status Update
  // =========================
  const handleOrderStatusChange = async (
    orderId,
    newStatus
  ) => {
    try {
      const response = await fetch(
        `http://localhost:5000/admin-orders/${orderId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            status: newStatus,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update order status");
      }

      const result = await response.json();

      console.log("Order updated:", result);

      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId
            ? {
                ...order,
                status: newStatus,
              }
            : order
        )
      );

      Swal.fire({
        icon: "success",
        title: "Order Status Updated",
        text: `Order status changed to ${newStatus}`,
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (error) {
      console.log("Order status update error:", error);

      Swal.fire({
        icon: "error",
        title: "Update Failed",
        text: "Could not update order status.",
      });
    }
  };

  // =========================
  // Dashboard Calculations
  // =========================

  const totalRevenue = orders.reduce(
    (total, order) =>
      total + Number(order.total || 0),
    0
  );

  const deliveredOrders = orders.filter(
    (order) => order.status === "Delivered"
  ).length;

  // =========================
  // Recent Appointments
  // =========================

  const recentAppointments = [...appointments]
    .sort(
      (a, b) =>
        new Date(
          b.date || b.appointmentDate || 0
        ) -
        new Date(
          a.date || a.appointmentDate || 0
        )
    )
    .slice(0, 5);

  // =========================
  // Recent Orders
  // =========================

  const recentOrders = [...orders]
    .sort(
      (a, b) =>
        new Date(b.orderDate || 0) -
        new Date(a.orderDate || 0)
    )
    .slice(0, 5);

  // =========================
  // Loading
  // =========================

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-lg text-[#5F6FFF]"></span>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 bg-gray-50 min-h-screen">

      {/* =========================
          Page Header
      ========================= */}
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
          Admin Dashboard
        </h1>

        <p className="text-gray-500 mt-1">
          Welcome to DentalCare Admin Panel
        </p>
      </div>


      {/* =========================
          Statistics Cards
      ========================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 mb-8">

        {/* Total Users */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          <div className="flex justify-between items-center gap-3">

            <div className="min-w-0">
              <p className="text-gray-500 text-sm">
                Total Users
              </p>

              <h3 className="text-3xl font-bold mt-2 text-gray-800">
                {users.length}
              </h3>
            </div>

            <div className="w-14 h-14 shrink-0 rounded-xl bg-blue-100 flex items-center justify-center text-2xl">
              👥
            </div>

          </div>
        </div>


        {/* Total Doctors */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          <div className="flex justify-between items-center gap-3">

            <div className="min-w-0">
              <p className="text-gray-500 text-sm">
                Total Doctors
              </p>

              <h3 className="text-3xl font-bold mt-2 text-gray-800">
                {doctors.length}
              </h3>
            </div>

            <div className="w-14 h-14 shrink-0 rounded-xl bg-green-100 flex items-center justify-center text-2xl">
              👨‍⚕️
            </div>

          </div>
        </div>


        {/* Appointments */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          <div className="flex justify-between items-center gap-3">

            <div className="min-w-0">
              <p className="text-gray-500 text-sm">
                Appointments
              </p>

              <h3 className="text-3xl font-bold mt-2 text-gray-800">
                {appointments.length}
              </h3>
            </div>

            <div className="w-14 h-14 shrink-0 rounded-xl bg-purple-100 flex items-center justify-center text-2xl">
              📅
            </div>

          </div>
        </div>


        {/* Total Revenue */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          <div className="flex justify-between items-center gap-3">

            <div className="min-w-0">
              <p className="text-gray-500 text-sm">
                Total Revenue
              </p>

              <h3 className="text-2xl font-bold mt-2 text-gray-800">
                ৳{totalRevenue.toLocaleString()}
              </h3>
            </div>

            <div className="w-14 h-14 shrink-0 rounded-xl bg-yellow-100 flex items-center justify-center text-2xl">
              💰
            </div>

          </div>
        </div>


        {/* Delivered Orders */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          <div className="flex justify-between items-center gap-3">

            <div className="min-w-0">
              <p className="text-gray-500 text-sm">
                Delivered Orders
              </p>

              <h3 className="text-3xl font-bold mt-2 text-gray-800">
                {deliveredOrders}
              </h3>
            </div>

            <div className="w-14 h-14 shrink-0 rounded-xl bg-pink-100 flex items-center justify-center text-2xl">
              🛍️
            </div>

          </div>
        </div>

      </div>


      {/* =========================
          Recent Appointments
      ========================= */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 mb-8">

        <div className="p-5 border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-800">
            Recent Appointments
          </h2>

          <p className="text-sm text-gray-500 mt-1">
            Latest appointment information
          </p>
        </div>


        <div className="overflow-x-auto">

          <table className="w-full">

            <thead className="bg-gray-50">
              <tr>

                <th className="text-left px-5 py-3 text-sm font-semibold text-gray-600">
                  Patient
                </th>

                <th className="text-left px-5 py-3 text-sm font-semibold text-gray-600">
                  Doctor
                </th>

                <th className="text-left px-5 py-3 text-sm font-semibold text-gray-600">
                  Date
                </th>

                <th className="text-left px-5 py-3 text-sm font-semibold text-gray-600">
                  Service
                </th>

                <th className="text-left px-5 py-3 text-sm font-semibold text-gray-600">
                  Status
                </th>

              </tr>
            </thead>


            <tbody>

              {recentAppointments.length > 0 ? (

                recentAppointments.map(
                  (appointment) => (

                    <tr
                      key={appointment._id}
                      className="border-t hover:bg-gray-50"
                    >

                      {/* Patient */}
                      <td className="px-5 py-4">

                        <p className="font-medium text-gray-800">
                          {appointment.patientName ||
                            appointment.userName ||
                            appointment.name ||
                            "N/A"}
                        </p>

                        <p className="text-xs text-gray-500">
                          {appointment.userEmail ||
                            appointment.email ||
                            ""}
                        </p>

                      </td>


                      {/* Doctor */}
                      <td className="px-5 py-4 text-gray-700">
                        {appointment.doctorName ||
                          appointment.doctor ||
                          "N/A"}
                      </td>


                      {/* Date */}
                      <td className="px-5 py-4 text-gray-700">
                        {appointment.date ||
                          appointment.appointmentDate ||
                          "N/A"}
                      </td>


                      {/* Service */}
                      <td className="px-5 py-4 text-gray-700">
                        {appointment.service ||
                          appointment.serviceName ||
                          "N/A"}
                      </td>


                      {/* Status */}
                      <td className="px-5 py-4">

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
                          className={`select select-sm border rounded-lg font-medium ${
                            appointment.status ===
                            "Pending"
                              ? "bg-orange-50 text-orange-600 border-orange-200"
                              : appointment.status ===
                                "Confirmed"
                              ? "bg-blue-50 text-blue-600 border-blue-200"
                              : appointment.status ===
                                "Completed"
                              ? "bg-green-50 text-green-600 border-green-200"
                              : "bg-red-50 text-red-600 border-red-200"
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
                  )
                )

              ) : (

                <tr>
                  <td
                    colSpan="5"
                    className="text-center py-10 text-gray-500"
                  >
                    No appointments found
                  </td>
                </tr>

              )}

            </tbody>

          </table>

        </div>
      </div>


      {/* =========================
          Recent Orders
      ========================= */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100">

        <div className="p-5 border-b border-gray-100">

          <h2 className="text-xl font-bold text-gray-800">
            Recent Orders
          </h2>

          <p className="text-sm text-gray-500 mt-1">
            Latest customer orders
          </p>

        </div>


        <div className="overflow-x-auto">

          <table className="w-full">

            <thead className="bg-gray-50">

              <tr>

                <th className="text-left px-5 py-3 text-sm font-semibold text-gray-600">
                  Order ID
                </th>

                <th className="text-left px-5 py-3 text-sm font-semibold text-gray-600">
                  Customer
                </th>

                <th className="text-left px-5 py-3 text-sm font-semibold text-gray-600">
                  Date
                </th>

                <th className="text-left px-5 py-3 text-sm font-semibold text-gray-600">
                  Products
                </th>

                <th className="text-left px-5 py-3 text-sm font-semibold text-gray-600">
                  Total
                </th>

                <th className="text-left px-5 py-3 text-sm font-semibold text-gray-600">
                  Status
                </th>

              </tr>

            </thead>


            <tbody>

              {recentOrders.length > 0 ? (

                recentOrders.map((order) => (

                  <tr
                    key={order._id}
                    className="border-t hover:bg-gray-50"
                  >

                    {/* Order ID */}
                    <td className="px-5 py-4">

                      <p className="font-semibold text-gray-800">
                        {order.orderId ||
                          order._id ||
                          "N/A"}
                      </p>

                    </td>


                    {/* Customer */}
                    <td className="px-5 py-4">

                      <p className="font-medium text-gray-800">

                        {order.customer?.firstName ||
                          order.customer?.name ||
                          order.userName ||
                          "Customer"}

                        {" "}

                        {order.customer?.lastName || ""}

                      </p>

                      <p className="text-xs text-gray-500">

                        {order.customer?.email ||
                          order.userEmail ||
                          ""}

                      </p>

                    </td>


                    {/* Date */}
                    <td className="px-5 py-4 text-gray-700">

                      {order.orderDate
                        ? new Date(
                            order.orderDate
                          ).toLocaleDateString()
                        : "N/A"}

                    </td>


                    {/* Products */}
                    <td className="px-5 py-4">

                      <div className="flex items-center gap-2">

                        <div className="w-9 h-9 rounded-lg bg-purple-50 flex items-center justify-center text-lg">
                          🛍️
                        </div>

                        <span className="text-gray-700">
                          {order.products?.length || 0}
                        </span>

                      </div>

                    </td>


                    {/* Total */}
                    <td className="px-5 py-4">

                      <span className="font-semibold text-gray-800">

                        ৳
                        {Number(
                          order.total || 0
                        ).toLocaleString()}

                      </span>

                    </td>


                    {/* Status */}
                    <td className="px-5 py-4">

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
                        className={`select select-sm border rounded-lg font-medium ${
                          order.status ===
                          "Processing"
                            ? "bg-orange-50 text-orange-600 border-orange-200"
                            : order.status ===
                              "Shipped"
                            ? "bg-purple-50 text-purple-600 border-purple-200"
                            : order.status ===
                              "Delivered"
                            ? "bg-green-50 text-green-600 border-green-200"
                            : "bg-red-50 text-red-600 border-red-200"
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

                ))

              ) : (

                <tr>

                  <td
                    colSpan="6"
                    className="text-center py-10 text-gray-500"
                  >
                    No orders found
                  </td>

                </tr>

              )}

            </tbody>

          </table>

        </div>
      </div>

    </div>
  );
};

export default AdminDashboard;