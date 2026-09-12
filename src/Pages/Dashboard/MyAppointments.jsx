import { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../../Provider/AuthProvider";

const MyAppointments = () => {
  const { user } = useContext(AuthContext);

  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) {
      return;
    }

    const loadAppointments = async () => {
      try {
        const response = await fetch("/data/appointments.json");
        const jsonAppointments = await response.json();

        const localAppointments =
          JSON.parse(localStorage.getItem("appointments")) || [];

        const appointmentStatuses =
          JSON.parse(
            localStorage.getItem("appointmentStatuses")
          ) || {};

        const myJsonAppointments = jsonAppointments.filter(
          (appointment) => appointment.userEmail === user.email
        );

        const myLocalAppointments = localAppointments.filter(
          (appointment) => appointment.userEmail === user.email
        );

        const appointmentMap = new Map();

        myJsonAppointments.forEach((appointment) => {
          appointmentMap.set(appointment._id, appointment);
        });

        myLocalAppointments.forEach((appointment) => {
          appointmentMap.set(appointment._id, appointment);
        });

        const allMyAppointments = Array.from(
          appointmentMap.values()
        );

        const finalAppointments = allMyAppointments.map(
          (appointment) => ({
            ...appointment,
            status:
              appointmentStatuses[appointment._id] ||
              appointment.status ||
              "Pending",
          })
        );

        setAppointments(finalAppointments);
      } catch (error) {
        console.log("Appointment loading error:", error);
      } finally {
        setLoading(false);
      }
    };

    loadAppointments();
  }, [user]);

  const handleCancel = (id) => {
    Swal.fire({
      title: "Cancel Appointment?",
      text: "Are you sure you want to cancel this appointment?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Cancel",
      cancelButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        const appointmentStatuses =
          JSON.parse(
            localStorage.getItem("appointmentStatuses")
          ) || {};

        const updatedStatuses = {
          ...appointmentStatuses,
          [id]: "Cancelled",
        };

        localStorage.setItem(
          "appointmentStatuses",
          JSON.stringify(updatedStatuses)
        );

        setAppointments((previous) =>
          previous.map((appointment) =>
            appointment._id === id
              ? {
                  ...appointment,
                  status: "Cancelled",
                }
              : appointment
          )
        );

        Swal.fire({
          title: "Appointment Cancelled",
          icon: "success",
        });
      }
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <span className="loading loading-spinner loading-lg text-[#5F6FFF]"></span>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          My Appointments
        </h2>

        <p className="text-gray-500 mt-1">
          View and manage your dental appointments
        </p>
      </div>

      {appointments.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm p-10 text-center">
          <div className="text-5xl mb-4">📅</div>

          <h3 className="text-xl font-semibold text-gray-700">
            No Appointments Found
          </h3>

          <p className="text-gray-500 mt-2">
            You don't have any appointments yet.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {appointments.map((appointment) => (
            <div
              key={appointment._id}
              className="bg-white rounded-xl shadow-sm border border-gray-100 p-5"
            >
              <div className="flex items-center gap-4">
                <img
                  src={appointment.doctorImage}
                  alt={appointment.doctorName}
                  className="w-16 h-16 rounded-full object-cover"
                />

                <div>
                  <h3 className="text-lg font-bold text-gray-800">
                    {appointment.doctorName}
                  </h3>

                  <p className="text-sm text-[#5F6FFF]">
                    {appointment.serviceName}
                  </p>
                </div>
              </div>

              <div className="mt-5 space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-500">
                    📅 Date
                  </span>

                  <span className="font-medium">
                    {appointment.date}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-500">
                    ⏰ Time
                  </span>

                  <span className="font-medium">
                    {appointment.time}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-500">
                    📝 Notes
                  </span>

                  <span className="font-medium text-right max-w-[220px]">
                    {appointment.notes}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-gray-500">
                    Status
                  </span>

                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      appointment.status === "Confirmed"
                        ? "bg-green-100 text-green-600"
                        : appointment.status === "Pending"
                        ? "bg-yellow-100 text-yellow-600"
                        : appointment.status === "Completed"
                        ? "bg-blue-100 text-blue-600"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {appointment.status}
                  </span>
                </div>
              </div>

              {appointment.status !== "Completed" &&
                appointment.status !== "Cancelled" && (
                  <button
                    onClick={() =>
                      handleCancel(appointment._id)
                    }
                    className="btn btn-outline btn-error w-full mt-5 hover:text-white"
                  >
                    Cancel Appointment
                  </button>
                )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyAppointments;