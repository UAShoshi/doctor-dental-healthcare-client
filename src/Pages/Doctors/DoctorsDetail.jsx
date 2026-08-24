import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

const DoctorsDetail = () => {

  const { id } = useParams();


  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/doctors.json")
      .then(res => res.json())
      .then(data => {
        setDoctors(data);
        setLoading(false);
      })
      .catch(error => {
        console.error(error);
        setLoading(false);
      });
  }, []);

  // Find specific service
  const doctor = doctors.find(
    item => item._id.toString() === id
  );

  // Loading
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  // Service not found
  if (!doctor) {
    return (
      <div className="text-center py-20">
        <h2 className="text-3xl font-bold">
          Service Not Found
        </h2>

        <Link to="/services">
          <button className="btn btn-primary mt-5">
            Back to Services
          </button>
        </Link>
      </div>
    );
  }




    return (
        <div>
            <div className="hero bg-base-200 min-h-screen">
  <div className="hero-content text-center">
    <div className="max-w-md">
      <h1 className="text-5xl font-bold">{doctor.doctorName}</h1>
      <p className="py-6">
        Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
        quasi. In deleniti eaque aut repudiandae et a id nisi.
      </p>
      <button className="btn btn-primary">Get Started</button>
    </div>
  </div>
</div>
        </div>
    );
};

export default DoctorsDetail;