import { useContext, useState } from 'react';
import AppointmentImg from '../../assets/team/Appointment.jpg';
import { AuthContext } from '../../Provider/AuthProvider';
import Swal from 'sweetalert2';

const AppointmentSection = () => {
       const { user } = useContext(AuthContext);

    const [formData, setFormData] = useState({
        serviceName: "",
        doctorName: "",
        name: "",
        phone: "",
        date: "",
        hour: "",
        minute: ""
    });


    // Doctor list from your original Appointment page
    const doctors = [
        {
            doctorId: "doctor01",
            doctorName: "Sarah Ahmed",
            doctorImage: "/doctors/doctor1.jpg"
        },
        {
            doctorId: "doctor02",
            doctorName: "Mohammad Rahman",
            doctorImage: "/doctors/doctor2.jpg"
        },
        {
            doctorId: "doctor03",
            doctorName: "Nusrat Jahan",
            doctorImage: "/doctors/doctor3.jpg"
        },
        {
            doctorId: "doctor04",
            doctorName: "Tanvir Hasan",
            doctorImage: "/doctors/doctor4.jpg"
        },
        {
            doctorId: "doctor05",
            doctorName: "Farzana Akter",
            doctorImage: "/doctors/doctor5.jpg"
        },
        {
            doctorId: "doctor06",
            doctorName: "Imran Kabir",
            doctorImage: "/doctors/doctor6.jpg"
        }
    ];


    // -----------------------------
    // Handle Input Change
    // -----------------------------

    const handleChange = (event) => {

        const { name, value } = event.target;

        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));

    };


    // -----------------------------
    // Make Appointment
    // -----------------------------

    const handleSubmit = (event) => {

        event.preventDefault();


        // Check Login

        if (!user) {

            Swal.fire({
                title: "Please Login",
                text: "You need to login before booking an appointment.",
                icon: "warning"
            });

            return;
        }


        // Find selected doctor

        const selectedDoctor = doctors.find(
            doctor => doctor.doctorName === formData.doctorName
        );


        if (!selectedDoctor) {

            Swal.fire({
                title: "Select Doctor",
                text: "Please select a doctor.",
                icon: "warning"
            });

            return;
        }


        // Create time

        const appointmentTime =
            `${formData.hour}:${formData.minute}`;


        // Create appointment

        const newAppointment = {

            _id: `appointment-${Date.now()}`,

            userId: user.uid,

            userName:
                formData.name ||
                user.displayName ||
                "DentalCare User",

            userEmail: user.email,

            phone: formData.phone,

            doctorId: selectedDoctor.doctorId,

            doctorName: selectedDoctor.doctorName,

            doctorImage: selectedDoctor.doctorImage,

            serviceName: formData.serviceName,

            date: formData.date,

            time: appointmentTime,

            status: "Pending",

            notes: "Appointment booked from website"

        };


        // Get old appointments

        const existingAppointments =
            JSON.parse(
                localStorage.getItem("appointments")
            ) || [];


        // Add new appointment

        const updatedAppointments = [
            ...existingAppointments,
            newAppointment
        ];


        // Save appointment

        localStorage.setItem(
            "appointments",
            JSON.stringify(updatedAppointments)
        );


        // Success message

        Swal.fire({
            title: "Appointment Booked!",
            text: "Your appointment has been booked successfully.",
            icon: "success",
            confirmButtonText: "OK"
        });


        // Reset form

        setFormData({
            serviceName: "",
            doctorName: "",
            name: "",
            phone: "",
            date: "",
            hour: "",
            minute: ""
        });

    };
    return (
        <div>
            {/* ---- Book an Appointment ---- */}

            <div className="hero bg-base-200 min-h-screen pt-30 pb-30">

                <div className="w-full hero-content flex-col lg:flex-row gap-20">

                    <img
                        alt=""
                        src={AppointmentImg}
                        className="w-1/2 rounded-lg shadow-2xl"
                    />


                    {/* ---- form ---- */}

                    <div className='w-1/2 mx-auto'>

                        <div className="text-center">

                            <h1 className="font-semibold text-2xl pb-5">
                                Book an Appointment
                            </h1>

                            <p className='pb-20'>
                                Our experienced team strives to provide a positive, stress-free <br />
                                experience.
                            </p>

                        </div>


                        <form
                            onSubmit={handleSubmit}
                            noValidate=""
                            className="space-y-6"
                        >

                            {/* Services + Doctor */}

                            <div className='flex gap-3'>

                                <fieldset className="fieldset w-full">

                                    <legend className="text-sm mb-2 uppercase">
                                        Services
                                    </legend>

                                    <select
                                        name="serviceName"
                                        value={formData.serviceName}
                                        onChange={handleChange}
                                        className="select p-7 rounded-xl border-0"
                                        required
                                    >

                                        <option value="" disabled>
                                            Select Service
                                        </option>

                                        <option value="Dental Fixing Service">
                                            Dental Fixing Service
                                        </option>

                                        <option value="Cosmetic Dentistry">
                                            Cosmetic Dentistry
                                        </option>

                                        <option value="Dental Implants">
                                            Dental Implants
                                        </option>

                                        <option value="Routine Dental Exam">
                                            Routine Dental Exam
                                        </option>

                                        <option value="Teeth Whitening">
                                            Teeth Whitening
                                        </option>

                                        <option value="Dental Fillings">
                                            Dental Fillings
                                        </option>

                                    </select>

                                </fieldset>


                                {/* Doctor */}

                                <fieldset className="fieldset w-full">

                                    <legend className="text-sm mb-2 uppercase">
                                        Doctor
                                    </legend>

                                    <select
                                        name="doctorName"
                                        value={formData.doctorName}
                                        onChange={handleChange}
                                        className="select p-7 rounded-xl border-0"
                                        required
                                    >

                                        <option value="" disabled>
                                            Select Doctor
                                        </option>


                                        {/* Your 6 Doctors */}

                                        {doctors.map(doctor => (

                                            <option
                                                key={doctor.doctorId}
                                                value={doctor.doctorName}
                                            >
                                                {doctor.doctorName}
                                            </option>

                                        ))}

                                    </select>

                                </fieldset>

                            </div>


                            {/* Name + Phone */}

                            <div className='flex gap-3'>

                                <fieldset className="fieldset w-full">

                                    <label
                                        htmlFor="name"
                                        className="text-sm mb-2"
                                    >
                                        YOUR NAME *
                                    </label>

                                    <input
                                        id="name"
                                        name="name"
                                        type="text"
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder="Your Full Name*"
                                        className="input p-7 rounded-xl border-0"
                                        required
                                    />

                                </fieldset>


                                <fieldset className="fieldset w-full">

                                    <label
                                        htmlFor="phone"
                                        className="text-sm mb-2"
                                    >
                                        YOUR PHONE
                                    </label>

                                    <input
                                        id="phone"
                                        name="phone"
                                        type="tel"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        placeholder="Your Phone"
                                        className="input p-7 rounded-xl border-0"
                                    />

                                </fieldset>

                            </div>


                            {/* Date + Time */}

                            <div className='flex gap-3'>

                                <fieldset className="fieldset w-full">

                                    <label
                                        htmlFor="date"
                                        className="text-sm mb-2"
                                    >
                                        DATE
                                    </label>

                                    <input
                                        id="date"
                                        name="date"
                                        type="date"
                                        value={formData.date}
                                        onChange={handleChange}
                                        className="input p-7 rounded-xl border-0"
                                        required
                                    />

                                </fieldset>


                                {/* Time */}

                                <div className='w-full'>

                                    <legend className="text-sm mb-2 uppercase">
                                        Time
                                    </legend>


                                    <div className='flex gap-3'>

                                        {/* Hour */}

                                        <fieldset className="fieldset w-1/2">

                                            <select
                                                name="hour"
                                                value={formData.hour}
                                                onChange={handleChange}
                                                className="select p-7 rounded-xl border-0"
                                                required
                                            >

                                                <option value="" disabled>
                                                    Hour
                                                </option>

                                                <option value="09">09</option>
                                                <option value="10">10</option>
                                                <option value="11">11</option>
                                                <option value="12">12</option>
                                                <option value="01">01</option>
                                                <option value="02">02</option>
                                                <option value="03">03</option>
                                                <option value="04">04</option>
                                                <option value="05">05</option>
                                                <option value="06">06</option>
                                                <option value="07">07</option>
                                                <option value="08">08</option>

                                            </select>

                                        </fieldset>


                                        {/* Minute */}

                                        <fieldset className="fieldset w-1/2">

                                            <select
                                                name="minute"
                                                value={formData.minute}
                                                onChange={handleChange}
                                                className="select p-7 rounded-xl border-0"
                                                required
                                            >

                                                <option value="" disabled>
                                                    Min
                                                </option>

                                                <option value="00">00</option>
                                                <option value="15">15</option>
                                                <option value="30">30</option>
                                                <option value="45">45</option>

                                            </select>

                                        </fieldset>

                                    </div>

                                </div>

                            </div>


                            {/* Submit */}

                            <button
                                type="submit"
                                className="w-full p-3 text-sm font-bold tracking-wide uppercase rounded btn bg-[#5F6FFF] text-white hover:bg-[#434fbe]"
                            >
                                Make an Appointment
                            </button>

                        </form>

                    </div>

                </div>

            </div>
        </div>
    );
};

export default AppointmentSection;