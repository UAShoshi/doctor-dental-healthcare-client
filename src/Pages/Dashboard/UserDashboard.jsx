import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../Provider/AuthProvider";

const UserDashboard = () => {
  const { user } = useContext(AuthContext);

  const [appointments, setAppointments] = useState([]);
  const [orders, setOrders] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) return;

    const fetchData = async () => {
      try {
        const [usersRes, appointmentsRes, ordersRes] =
          await Promise.all([
            fetch("/data/users.json"),
            fetch("/data/appointments.json"),
            fetch("/data/orders.json"),
          ]);

        const usersData = await usersRes.json();
        const appointmentsData = await appointmentsRes.json();
        const ordersData = await ordersRes.json();

        // ================= Current User =================
        const loggedUser = usersData.find(
          (item) => item.email === user.email
        );

        // ================= JSON Appointments =================
        const myJsonAppointments = appointmentsData.filter(
          (appointment) =>
            appointment.userEmail === user.email
        );

        // ================= LocalStorage Appointments =================
        const localAppointments =
          JSON.parse(
            localStorage.getItem("appointments")
          ) || [];

        const myLocalAppointments = localAppointments.filter(
          (appointment) =>
            appointment.userEmail === user.email
        );

        // ================= Cancelled Appointments =================
        const cancelledAppointments =
          JSON.parse(
            localStorage.getItem("cancelledAppointments")
          ) || [];

        // ================= Combine Appointments =================
        const allAppointments = [
          ...myJsonAppointments,
          ...myLocalAppointments,
        ];

        // Remove cancelled appointments
        const activeAppointments = allAppointments.filter(
          (appointment) =>
            !cancelledAppointments.includes(
              appointment._id
            )
        );

        // ================= Orders =================
        const myOrders = ordersData.filter(
          (order) => order.userEmail === user.email
        );

        // LocalStorage Orders
        const localOrders =
          JSON.parse(
            localStorage.getItem("orders")
          ) || [];

        const myLocalOrders = localOrders.filter(
          (order) => order.userEmail === user.email
        );

        const allOrders = [
          ...myOrders,
          ...myLocalOrders,
        ];

        // ================= Set State =================
        setCurrentUser(loggedUser);
        setAppointments(activeAppointments);
        setOrders(allOrders);
        setLoading(false);

      } catch (error) {
        console.log("Dashboard data error:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [user]);


  // ================= Loading =================
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <span className="loading loading-spinner loading-lg text-[#5F6FFF]"></span>
      </div>
    );
  }


  // ================= Today's Date =================
  const today = new Date();
  today.setHours(0, 0, 0, 0);


  // ================= Upcoming Appointments =================
  const upcomingAppointments = appointments
    .filter((appointment) => {

      const appointmentDate = new Date(
        appointment.date
      );

      return (
        appointmentDate >= today &&
        appointment.status !== "Cancelled" &&
        (
          appointment.status === "Confirmed" ||
          appointment.status === "Pending"
        )
      );
    })
    .sort(
      (a, b) =>
        new Date(a.date) - new Date(b.date)
    );


  // ================= Next Appointment =================
  const upcomingAppointment =
    upcomingAppointments.length > 0
      ? upcomingAppointments[0]
      : null;


  // ================= Recent Order =================
  const recentOrder =
    orders.length > 0
      ? orders[orders.length - 1]
      : null;


  return (
    <div className="p-6 md:p-8">

      {/* ================= Welcome Section ================= */}
      <div className="mb-8">

        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
          Welcome,{" "}
          {currentUser?.name ||
            user?.displayName ||
            "User"}{" "}
          👋
        </h1>

        <p className="text-gray-500 mt-2">
          Manage your dental appointments and orders
          from here.
        </p>

      </div>


      {/* ================= Statistics ================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">

        {/* Total Appointments */}
        <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-gray-500 font-medium">
                Total Appointments
              </p>

              <h2 className="text-3xl font-bold text-gray-800 mt-2">
                {appointments.length}
              </h2>

            </div>

            <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center text-2xl">
              📅
            </div>

          </div>

        </div>


        {/* Total Orders */}
        <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-gray-500 font-medium">
                Total Orders
              </p>

              <h2 className="text-3xl font-bold text-gray-800 mt-2">
                {orders.length}
              </h2>

            </div>

            <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center text-2xl">
              🛒
            </div>

          </div>

        </div>

      </div>


      {/* ================= Upcoming Appointment ================= */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8">

        <div className="flex justify-between items-center mb-5">

          <h2 className="text-xl font-bold text-gray-800">
            Upcoming Appointment
          </h2>

          <Link
            to="/dashboard/appointments"
            className="text-[#5F6FFF] font-semibold hover:underline"
          >
            View All
          </Link>

        </div>


        {upcomingAppointment ? (

          <div className="flex flex-col md:flex-row gap-5 items-start md:items-center">

            {/* Doctor Image */}
            <img
              src={
                upcomingAppointment.doctorImage
              }
              alt={
                upcomingAppointment.doctorName
              }
              className="w-20 h-20 rounded-xl object-cover"
            />


            {/* Appointment Information */}
            <div className="flex-1">

              <h3 className="text-lg font-bold text-gray-800">
                {upcomingAppointment.doctorName}
              </h3>

              <p className="text-gray-500 mt-1">
                {upcomingAppointment.serviceName}
              </p>

              <div className="flex flex-wrap gap-4 mt-3 text-sm text-gray-600">

                <span>
                  📅 {upcomingAppointment.date}
                </span>

                <span>
                  🕐 {upcomingAppointment.time}
                </span>

              </div>

            </div>


            {/* Status */}
            <div>

              <span
                className={`px-4 py-2 rounded-full text-sm font-semibold ${
                  upcomingAppointment.status ===
                  "Confirmed"
                    ? "bg-green-100 text-green-600"
                    : "bg-yellow-100 text-yellow-600"
                }`}
              >
                {upcomingAppointment.status}
              </span>

            </div>

          </div>

        ) : (

          /* ================= No Appointment ================= */
          <div className="text-center py-10">

            <div className="text-4xl mb-3">
              📅
            </div>

            <p className="text-gray-500">
              You don't have any upcoming
              appointment.
            </p>

            <Link
              to="/appointment"
              className="inline-block mt-4 px-5 py-2 rounded-lg bg-[#5F6FFF] text-white font-semibold hover:bg-[#434fbe]"
            >
              Book Appointment
            </Link>

          </div>

        )}

      </div>


      {/* ================= Recent Order ================= */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">

        <div className="flex justify-between items-center mb-5">

          <h2 className="text-xl font-bold text-gray-800">
            Recent Order
          </h2>

          <Link
            to="/dashboard/orders"
            className="text-[#5F6FFF] font-semibold hover:underline"
          >
            View All
          </Link>

        </div>


        {recentOrder ? (

          <div className="border border-gray-100 rounded-xl p-5">

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">

              {/* Order ID */}
              <div>

                <p className="text-gray-500 text-sm">
                  Order ID
                </p>

                <h3 className="font-bold text-gray-800 mt-1">
                  #{recentOrder.orderId}
                </h3>

              </div>


              {/* Order Date */}
              <div>

                <p className="text-gray-500 text-sm">
                  Order Date
                </p>

                <p className="font-semibold text-gray-800 mt-1">
                  {recentOrder.orderDate}
                </p>

              </div>


              {/* Total */}
              <div>

                <p className="text-gray-500 text-sm">
                  Total
                </p>

                <p className="font-bold text-[#5F6FFF] mt-1">
                  ৳{recentOrder.total}
                </p>

              </div>


              {/* Status */}
              <div>

                <span
                  className={`px-4 py-2 rounded-full text-sm font-semibold ${
                    recentOrder.status ===
                    "Delivered"
                      ? "bg-green-100 text-green-600"
                      : recentOrder.status ===
                        "Shipped"
                      ? "bg-blue-100 text-blue-600"
                      : "bg-yellow-100 text-yellow-600"
                  }`}
                >
                  {recentOrder.status}
                </span>

              </div>

            </div>


            {/* Products */}
            <div className="mt-5 pt-5 border-t border-gray-100">

              <p className="text-sm text-gray-500 mb-2">
                Products
              </p>

              <div className="flex flex-wrap gap-2">

                {recentOrder.products?.map(
                  (product, index) => (
                    <span
                      key={`${product.productId}-${index}`}
                      className="bg-gray-100 px-3 py-1.5 rounded-lg text-sm text-gray-700"
                    >
                      {product.name} ×{" "}
                      {product.quantity}
                    </span>
                  )
                )}

              </div>

            </div>

          </div>

        ) : (

          /* ================= No Orders ================= */
          <div className="text-center py-10">

            <div className="text-4xl mb-3">
              🛒
            </div>

            <p className="text-gray-500">
              You don't have any orders yet.
            </p>

            <Link
              to="/shop"
              className="inline-block mt-4 px-5 py-2 rounded-lg bg-[#5F6FFF] text-white font-semibold hover:bg-[#434fbe]"
            >
              Visit Shop
            </Link>

          </div>

        )}

      </div>

    </div>
  );
};

export default UserDashboard;