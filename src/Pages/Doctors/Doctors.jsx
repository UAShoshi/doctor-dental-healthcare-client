import React, { useEffect, useState } from 'react';
import Cover from '../../Shared/Cover/Cover';
import DoctorsCover from '../../assets/team/doctor-cover.jpg';
import AllDoctors from './AllDoctors';

const Doctors = () => {
    const [doctors, setDoctors] = useState([]);

    useEffect(() =>{
        fetch('doctors.json')
        .then(res => res.json())
        .then(data => 
            setDoctors(data));
    }, [])

    return (
        <div>
            <div>
                <Cover img={DoctorsCover} title="OUR DOCTORS" doctors="Our Doctors "></Cover>
            </div>
            <div className="text-center pt-20">
                <h1 className="text-4xl font-semibold py-5">Our Doctors</h1>
                <p>At our Pediatric Dentistry & Orthodontics Clinic, we believe every child <br />deserves a positive, stress-free dental experience.
                </p>
            </div>
            <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-5 mt-20'>
                 {doctors.map(doctor => (
                    <AllDoctors
                        key={doctor._id}
                        doctor={doctor}
                    />
                ))}
            </div>
        </div>
    );
};

export default Doctors;