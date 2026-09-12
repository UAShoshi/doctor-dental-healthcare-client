import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const ManageAppointmentsOrders = () => {
  const [appointments, setAppointments] = useState([]);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        // Appointments from JSON
        const appointmentsResponse = await fetch(
          "/admindata/appointments.json"
        );

        const appointmentsData =
          await appointmentsResponse.json();

        // Appointments booked by users
        const localAppointments =
          JSON.parse(localStorage.getItem("appointments")) || [];

        // Saved appointment statuses
        const savedStatuses =
          JSON.parse(
            localStorage.getItem("appointmentStatuses")
          ) || {};

        // Combine JSON and localStorage appointments
        const appointmentMap = new Map();

        appointmentsData.forEach((appointment) => {
          appointmentMap.set(appointment._id, appointment);
        });

        localAppointments.forEach((appointment) => {
          appointmentMap.set(appointment._id, appointment);
        });

        const allAppointments = Array.from(
          appointmentMap.values()
        );

        // Apply updated statuses
        const finalAppointments = allAppointments.map(
          (appointment) => ({
            ...appointment,
            status:
              savedStatuses[appointment._id] ||
              appointment.status ||
              "Pending",
          })
        );

        // Orders from localStorage
        const savedOrders =
          JSON.parse(localStorage.getItem("orders")) || [];

        setAppointments(finalAppointments);
        setOrders(savedOrders);
      } catch (error) {
        console.log(error);
      }
    };

    loadData();
  }, []);

  const handleAppointmentStatus = (id, status) => {
    const savedStatuses =
      JSON.parse(
        localStorage.getItem("appointmentStatuses")
      ) || {};

    const updatedStatuses = {
      ...savedStatuses,
      [id]: status,
    };

    localStorage.setItem(
      "appointmentStatuses",
      JSON.stringify(updatedStatuses)
    );

    setAppointments((previous) =>
      previous.map((appointment) =>
        appointment._id === id
          ? { ...appointment, status }
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
  };

  const handleOrderStatus = (id, status) => {
    const updatedOrders = orders.map((order) =>
      order._id === id
        ? { ...order, status }
        : order
    );

    localStorage.setItem(
      "orders",
      JSON.stringify(updatedOrders)
    );

    setOrders(updatedOrders);

    Swal.fire({
      icon: "success",
      title: "Status Updated",
      text: `Order status changed to ${status}`,
      timer: 1200,
      showConfirmButton: false,
    });
  };

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-800">
          Appointments & Orders
        </h2>

        <p className="text-gray-500 mt-2">
          Manage customer appointments and shop orders.
        </p>
      </div>

      {/* Appointments */}
      <div className="bg-white rounded-2xl border shadow-sm overflow-hidden mb-8">
        <div className="p-6 border-b">
          <h3 className="text-xl font-bold">
            📅 Appointments
          </h3>

          <p className="text-sm text-gray-500 mt-1">
            Total appointments: {appointments.length}
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
                  Time
                </th>

                <th className="text-left p-4">
                  Status
                </th>
              </tr>
            </thead>

            <tbody>
              {appointments.map((appointment) => (
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

                  <td className="p-4 text-gray-600">
                    {appointment.time}
                  </td>

                  <td className="p-4">
                    <select
                      value={
                        appointment.status || "Pending"
                      }
                      onChange={(e) =>
                        handleAppointmentStatus(
                          appointment._id,
                          e.target.value
                        )
                      }
                      className="select select-bordered select-sm"
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

      {/* Orders */}
      <div className="bg-white rounded-2xl border shadow-sm overflow-hidden">
        <div className="p-6 border-b">
          <h3 className="text-xl font-bold">
            🛒 Orders
          </h3>

          <p className="text-sm text-gray-500 mt-1">
            Total orders: {orders.length}
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
              {orders.map((order) => (
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
                    {order.products?.length || 0} item(s)
                  </td>

                  <td className="p-4 font-semibold">
                    ৳{order.total || 0}
                  </td>

                  <td className="p-4">
                    <select
                      value={
                        order.status || "Processing"
                      }
                      onChange={(e) =>
                        handleOrderStatus(
                          order._id,
                          e.target.value
                        )
                      }
                      className="select select-bordered select-sm"
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

export default ManageAppointmentsOrders;