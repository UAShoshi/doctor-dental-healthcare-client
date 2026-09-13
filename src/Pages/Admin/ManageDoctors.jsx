import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const ManageDoctors = () => {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    const loadDoctors = async () => {
      try {
        const response = await fetch("/admindata/doctors.json");
        const jsonDoctors = await response.json();

        const localDoctors =
          JSON.parse(localStorage.getItem("doctors")) || [];

        const deletedDoctorIds =
          JSON.parse(
            localStorage.getItem("deletedDoctorIds")
          ) || [];

        const doctorMap = new Map();

        // JSON doctors
        jsonDoctors.forEach((doctor) => {
          doctorMap.set(doctor._id, doctor);
        });

        // LocalStorage doctors
        localDoctors.forEach((doctor) => {
          doctorMap.set(doctor._id, doctor);
        });

        // Remove deleted doctors
        deletedDoctorIds.forEach((id) => {
          doctorMap.delete(id);
        });

        const allDoctors = Array.from(doctorMap.values());

        setDoctors(allDoctors);
      } catch (error) {
        console.log("Doctors loading error:", error);
      }
    };

    loadDoctors();
  }, []);

  // Remove Doctor
  const handleRemoveDoctor = (id) => {
    Swal.fire({
      title: "Remove Doctor?",
      text: "This doctor will be removed from the doctor list.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, Remove",
    }).then((result) => {
      if (result.isConfirmed) {
        // Remove from UI
        const updatedDoctors = doctors.filter(
          (doctor) => doctor._id !== id
        );

        setDoctors(updatedDoctors);

        // Remove from localStorage
        const localDoctors =
          JSON.parse(localStorage.getItem("doctors")) || [];

        const updatedLocalDoctors = localDoctors.filter(
          (doctor) => doctor._id !== id
        );

        localStorage.setItem(
          "doctors",
          JSON.stringify(updatedLocalDoctors)
        );

        // Save deleted doctor ID
        const deletedDoctorIds =
          JSON.parse(
            localStorage.getItem("deletedDoctorIds")
          ) || [];

        if (!deletedDoctorIds.includes(id)) {
          deletedDoctorIds.push(id);
        }

        localStorage.setItem(
          "deletedDoctorIds",
          JSON.stringify(deletedDoctorIds)
        );

        Swal.fire({
          icon: "success",
          title: "Removed!",
          text: "Doctor has been removed.",
          timer: 1200,
          showConfirmButton: false,
        });
      }
    });
  };

  // View Doctor
  const handleViewDoctor = (doctor) => {
    Swal.fire({
      title: doctor.doctorName,
      html: `
        <div style="text-align: left;">
          <p><strong>Specialization:</strong> ${doctor.specialization}</p>
          <p><strong>Phone:</strong> ${doctor.phone}</p>
          <p><strong>Email:</strong> ${doctor.email}</p>
          <p><strong>Location:</strong> ${doctor.location}</p>
          <p><strong>Qualification:</strong> ${
            doctor.qualification || "N/A"
          }</p>
          <p><strong>Hospital:</strong> ${
            doctor.hospital || "N/A"
          }</p>
        </div>
      `,
      confirmButtonText: "Close",
      confirmButtonColor: "#5F6FFF",
    });
  };

  return (
    <div>
      {/* Heading */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-800">
          Manage Doctors
        </h2>

        <p className="text-gray-500 mt-2">
          View and manage all DentalCare doctors.
        </p>

        <p className="text-sm text-gray-500 mt-2">
          Total Doctors:{" "}
          <span className="font-semibold text-[#5F6FFF]">
            {doctors.length}
          </span>
        </p>
      </div>

      {/* Doctors */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {doctors.map((doctor) => (
          <div
            key={doctor._id}
            className="bg-white rounded-2xl border shadow-sm overflow-hidden"
          >
            {/* Doctor Image */}
            <div className="h-56 bg-gray-100 flex justify-center">
              <img
                src={doctor.doctorImage}
                alt={doctor.doctorName}
                className="h-full w-full object-cover"
              />
            </div>

            {/* Information */}
            <div className="p-5">
              <h3 className="text-xl font-bold">
                {doctor.doctorName}
              </h3>

              <p className="text-[#5F6FFF] font-semibold mt-1">
                {doctor.specialization}
              </p>

              <div className="mt-4 space-y-2 text-sm text-gray-600">
                <p>📞 {doctor.phone}</p>

                <p>✉️ {doctor.email}</p>

                <p>📍 {doctor.location}</p>
              </div>

              {/* Available Days */}
              <div className="mt-4">
                <p className="font-semibold text-sm mb-2">
                  Available Days
                </p>

                <div className="flex flex-wrap gap-2">
                  {doctor.availableDays?.map((day, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-xs"
                    >
                      {day}
                    </span>
                  ))}
                </div>
              </div>

              {/* Buttons */}
              <div className="flex gap-3 mt-5">
                <button
                  onClick={() => handleViewDoctor(doctor)}
                  className="flex-1 border border-[#5F6FFF] text-[#5F6FFF] py-2 rounded-lg font-semibold hover:bg-[#5F6FFF] hover:text-white"
                >
                  View
                </button>

                <button
                  onClick={() =>
                    handleRemoveDoctor(doctor._id)
                  }
                  className="flex-1 bg-red-50 text-red-500 py-2 rounded-lg font-semibold hover:bg-red-500 hover:text-white"
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {doctors.length === 0 && (
        <div className="text-center py-16 bg-white rounded-2xl border">
          <h3 className="text-xl font-semibold text-gray-700">
            No Doctors Found
          </h3>

          <p className="text-gray-500 mt-2">
            There are no doctors available.
          </p>
        </div>
      )}
    </div>
  );
};

export default ManageDoctors;