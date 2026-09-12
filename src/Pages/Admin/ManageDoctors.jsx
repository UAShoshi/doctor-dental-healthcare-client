import { useEffect, useState } from "react";

const ManageDoctors = () => {

  const [doctors, setDoctors] = useState([]);

  useEffect(() => {

    fetch("/admindata/doctors.json")
      .then(res => res.json())
      .then(data => {
        setDoctors(data);
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
          Manage Doctors
        </h2>

        <p className="text-gray-500 mt-2">
          View and manage all DentalCare doctors.
        </p>

      </div>


      {/* Doctors */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

        {doctors.map(doctor => (

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

                <p>
                  📞 {doctor.phone}
                </p>

                <p>
                  ✉️ {doctor.email}
                </p>

                <p>
                  📍 {doctor.location}
                </p>

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

                <button className="flex-1 border border-[#5F6FFF] text-[#5F6FFF] py-2 rounded-lg font-semibold hover:bg-[#5F6FFF] hover:text-white">
                  View
                </button>

                <button className="flex-1 bg-red-50 text-red-500 py-2 rounded-lg font-semibold hover:bg-red-500 hover:text-white">
                  Remove
                </button>

              </div>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
};

export default ManageDoctors;