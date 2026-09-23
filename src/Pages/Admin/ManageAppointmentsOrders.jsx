import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const ManageAppointmentsOrders = () => {
  const [appointments, setAppointments] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // ================================
  // GET APPOINTMENTS + ORDERS
  // ================================
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);

        // Get appointments
        const appointmentsResponse = await fetch(
          "http://localhost:5000/admin-appointments"
        );

        if (!appointmentsResponse.ok) {
          throw new Error("Failed to fetch appointments");
        }

        const appointmentsData =
          await appointmentsResponse.json();

        // Get orders
        const ordersResponse = await fetch(
          "http://localhost:5000/admin-orders"
        );

        if (!ordersResponse.ok) {
          throw new Error("Failed to fetch orders");
        }

        const ordersData = await ordersResponse.json();

        // Set MongoDB data
        setAppointments(appointmentsData);
        setOrders(ordersData);
      } catch (error) {
        console.log("Data loading error:", error);

        Swal.fire({
          icon: "error",
          title: "Data Loading Failed",
          text: "Could not load appointments and orders.",
        });
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // ================================
  // APPOINTMENT STATUS STYLE
  // ================================
  const getAppointmentStatusStyle = (status) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-50 text-yellow-600 border-yellow-200";

      case "Confirmed":
        return "bg-blue-50 text-blue-600 border-blue-200";

      case "Completed":
        return "bg-green-50 text-green-600 border-green-200";

      case "Cancelled":
        return "bg-red-50 text-red-600 border-red-200";

      default:
        return "bg-gray-50 text-gray-600 border-gray-200";
    }
  };

  // ================================
  // ORDER STATUS STYLE
  // ================================
  const getOrderStatusStyle = (status) => {
    switch (status) {
      case "Processing":
        return "bg-orange-50 text-orange-600 border-orange-200";

      case "Shipped":
        return "bg-purple-50 text-purple-600 border-purple-200";

      case "Delivered":
        return "bg-green-50 text-green-600 border-green-200";

      case "Cancelled":
        return "bg-red-50 text-red-600 border-red-200";

      default:
        return "bg-gray-50 text-gray-600 border-gray-200";
    }
  };

  // ================================
  // UPDATE APPOINTMENT STATUS
  // ================================
  const handleAppointmentStatus = async (id, status) => {
    try {
      const response = await fetch(
        `http://localhost:5000/admin-appointments/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            status: status,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update appointment");
      }

      const result = await response.json();

      console.log(result);

      // Update frontend state
      setAppointments((previous) =>
        previous.map((appointment) =>
          appointment._id === id
            ? {
                ...appointment,
                status: status,
              }
            : appointment
        )
      );

      Swal.fire({
        icon: "success",
        title: "Status Updated",
        text: `Appointment status changed to ${status}`,
        timer: 1200,
        showConfirmButton: false,
      });
    } catch (error) {
      console.log(error);

      Swal.fire({
        icon: "error",
        title: "Update Failed",
        text: "Could not update appointment status.",
      });
    }
  };

  // ================================
  // UPDATE ORDER STATUS
  // ================================
  const handleOrderStatus = async (id, status) => {
    try {
      const response = await fetch(
        `http://localhost:5000/admin-orders/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            status: status,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update order");
      }

      const result = await response.json();

      console.log(result);

      // Update frontend state
      setOrders((previous) =>
        previous.map((order) =>
          order._id === id
            ? {
                ...order,
                status: status,
              }
            : order
        )
      );

      Swal.fire({
        icon: "success",
        title: "Status Updated",
        text: `Order status changed to ${status}`,
        timer: 1200,
        showConfirmButton: false,
      });
    } catch (error) {
      console.log(error);

      Swal.fire({
        icon: "error",
        title: "Update Failed",
        text: "Could not update order status.",
      });
    }
  };

  // ================================
  // LOADING
  // ================================
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <span className="loading loading-spinner loading-lg text-[#5F6FFF]"></span>
      </div>
    );
  }

  return (
    <div className="space-y-8">

      {/* ================================
          PAGE HEADING
      ================================= */}

      <div>
        <h2 className="text-3xl font-bold text-gray-800">
          Appointments & Orders
        </h2>

        <p className="text-gray-500 mt-2">
          Manage customer appointments and shop orders.
        </p>
      </div>


      {/* ================================
          APPOINTMENTS
      ================================= */}

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">

        {/* Header */}

        <div className="p-6 border-b">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

            <div className="flex items-center gap-3">

              <div className="w-11 h-11 rounded-xl bg-blue-100 flex items-center justify-center text-xl">
                📅
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-800">
                  Appointments
                </h3>

                <p className="text-sm text-gray-500 mt-1">
                  Manage customer dental appointments
                </p>
              </div>

            </div>


            {/* Total */}

            <div className="bg-white border border-blue-100 px-5 py-2 rounded-xl">

              <p className="text-xs text-gray-500">
                Total Appointments
              </p>

              <p className="text-xl font-bold text-[#5F6FFF]">
                {appointments.length}
              </p>

            </div>

          </div>
        </div>


        {/* Appointment Table */}

        {appointments.length > 0 && (
          <div className="overflow-x-auto">

            <table className="w-full">

              <thead className="bg-gray-50">

                <tr>

                  <th className="text-left p-4 text-sm font-semibold text-gray-600">
                    Doctor
                  </th>

                  <th className="text-left p-4 text-sm font-semibold text-gray-600">
                    Service
                  </th>

                  <th className="text-left p-4 text-sm font-semibold text-gray-600">
                    Date
                  </th>

                  <th className="text-left p-4 text-sm font-semibold text-gray-600">
                    Time
                  </th>

                  <th className="text-left p-4 text-sm font-semibold text-gray-600">
                    Status
                  </th>

                </tr>

              </thead>


              <tbody>

                {appointments.map((appointment) => (

                  <tr
                    key={appointment._id}
                    className="border-t hover:bg-gray-50 transition"
                  >

                    {/* Doctor */}

                    <td className="p-4">

                      <div className="flex items-center gap-3">

                        <img
                          src={appointment.doctorImage}
                          alt={appointment.doctorName}
                          className="w-11 h-11 rounded-full object-cover border"
                        />

                        <div>

                          <p className="font-semibold text-gray-800">
                            {appointment.doctorName}
                          </p>

                          <p className="text-xs text-gray-500">
                            {appointment.userName}
                          </p>

                        </div>

                      </div>

                    </td>


                    {/* Service */}

                    <td className="p-4">

                      <span className="font-medium text-gray-700">
                        {appointment.serviceName}
                      </span>

                    </td>


                    {/* Date */}

                    <td className="p-4">

                      <span className="text-sm text-gray-600">
                        {appointment.date}
                      </span>

                    </td>


                    {/* Time */}

                    <td className="p-4">

                      <span className="text-sm text-gray-600">
                        {appointment.time}
                      </span>

                    </td>


                    {/* Status */}

                    <td className="p-4">

                      <select
                        value={appointment.status || "Pending"}
                        onChange={(e) =>
                          handleAppointmentStatus(
                            appointment._id,
                            e.target.value
                          )
                        }
                        className={`select select-bordered select-sm w-36 font-semibold ${getAppointmentStatusStyle(
                          appointment.status || "Pending"
                        )}`}
                      >

                        <option value="Pending">
                          🟡 Pending
                        </option>

                        <option value="Confirmed">
                          🔵 Confirmed
                        </option>

                        <option value="Completed">
                          🟢 Completed
                        </option>

                        <option value="Cancelled">
                          🔴 Cancelled
                        </option>

                      </select>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>
        )}


        {/* Empty */}

        {appointments.length === 0 && (

          <div className="py-16 text-center">

            <div className="text-5xl mb-3">
              📅
            </div>

            <h3 className="text-lg font-semibold text-gray-700">
              No Appointments Found
            </h3>

            <p className="text-sm text-gray-500 mt-1">
              There are no customer appointments yet.
            </p>

          </div>

        )}

      </div>


      {/* ================================
          ORDERS
      ================================= */}

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">

        {/* Header */}

        <div className="p-6 border-b">

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

            <div className="flex items-center gap-3">

              <div className="w-11 h-11 rounded-xl bg-purple-100 flex items-center justify-center text-xl">
                🛒
              </div>

              <div>

                <h3 className="text-xl font-bold text-gray-800">
                  Orders
                </h3>

                <p className="text-sm text-gray-500 mt-1">
                  Manage DentalCare shop orders
                </p>

              </div>

            </div>


            {/* Total */}

            <div className="bg-white border border-purple-100 px-5 py-2 rounded-xl">

              <p className="text-xs text-gray-500">
                Total Orders
              </p>

              <p className="text-xl font-bold text-purple-600">
                {orders.length}
              </p>

            </div>

          </div>

        </div>


        {/* Order Table */}

        {orders.length > 0 && (

          <div className="overflow-x-auto">

            <table className="w-full">

              <thead className="bg-gray-50">

                <tr>

                  <th className="text-left p-4 text-sm font-semibold text-gray-600">
                    Order ID
                  </th>

                  <th className="text-left p-4 text-sm font-semibold text-gray-600">
                    Date
                  </th>

                  <th className="text-left p-4 text-sm font-semibold text-gray-600">
                    Products
                  </th>

                  <th className="text-left p-4 text-sm font-semibold text-gray-600">
                    Total
                  </th>

                  <th className="text-left p-4 text-sm font-semibold text-gray-600">
                    Status
                  </th>

                </tr>

              </thead>


              <tbody>

                {orders.map((order) => (

                  <tr
                    key={order._id}
                    className="border-t hover:bg-gray-50 transition"
                  >

                    {/* Order ID */}

                    <td className="p-4">

                      <p className="font-semibold text-gray-800">
                        {order.orderId}
                      </p>

                      <p className="text-xs text-gray-400 mt-1">
                        Customer Order
                      </p>

                    </td>


                    {/* Date */}

                    <td className="p-4">

                      <span className="text-sm text-gray-600">
                        {order.orderDate}
                      </span>

                    </td>


                    {/* Products */}

                    <td className="p-4">

                      <div className="flex items-center gap-2">

                        <div className="w-9 h-9 rounded-lg bg-purple-50 flex items-center justify-center">
                          🛍️
                        </div>

                        <span className="text-sm font-medium text-gray-700">
                          {order.products?.length || 0} item(s)
                        </span>

                      </div>

                    </td>


                    {/* Total */}

                    <td className="p-4">

                      <span className="text-base font-bold text-gray-800">
                        ৳{order.total || 0}
                      </span>

                    </td>


                    {/* Status */}

                    <td className="p-4">

                      <select
                        value={order.status || "Processing"}
                        onChange={(e) =>
                          handleOrderStatus(
                            order._id,
                            e.target.value
                          )
                        }
                        className={`select select-bordered select-sm w-36 font-semibold ${getOrderStatusStyle(
                          order.status || "Processing"
                        )}`}
                      >

                        <option value="Processing">
                          🟠 Processing
                        </option>

                        <option value="Shipped">
                          🟣 Shipped
                        </option>

                        <option value="Delivered">
                          🟢 Delivered
                        </option>

                        <option value="Cancelled">
                          🔴 Cancelled
                        </option>

                      </select>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        )}


        {/* Empty */}

        {orders.length === 0 && (

          <div className="py-16 text-center">

            <div className="text-5xl mb-3">
              🛒
            </div>

            <h3 className="text-lg font-semibold text-gray-700">
              No Orders Found
            </h3>

            <p className="text-sm text-gray-500 mt-1">
              There are no shop orders yet.
            </p>

          </div>

        )}

      </div>

    </div>
  );
};

export default ManageAppointmentsOrders;