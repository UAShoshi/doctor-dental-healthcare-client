import React, { useEffect, useState } from 'react';
import { TiSocialFacebook, TiSocialLinkedin, TiSocialTwitter } from 'react-icons/ti';
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
      {/* ------ first stap ------ */}
      <div className="bg-base-200 py-20">
        <div className="hero-content flex-col lg:flex-row-reverse max-w-7xl mx-auto gap-40">
          <div className="w-full lg:w-2/3">
            <img
              src={doctor.doctorImage}
              alt=""
              className="h-screen rounded-lg"
            />
          </div>
          <div className='px-8 w-full lg:w-2/3 space-y-10'>
            <div className="badge badge-soft bg-[#cfe2ff] mb-5 uppercase">{doctor.specialization}</div>
            <h1 className="text-7xl font-semibold pb-5">{doctor.doctorName}</h1>
            <p>
              <span className='font-semibold'>Phone:</span> {doctor.phone}
            </p>
            <p>
              <span className='font-semibold'>Email:</span> {doctor.email}
            </p>
            <p>
              <span className='font-semibold'>Location:</span> {doctor.location}
            </p>
            <div className="text-2xl flex gap-2 pt-8">
              <button className="bg-[#cfe2ff] p-2 rounded-full hover:bg-[#DADEFF]"><TiSocialLinkedin></TiSocialLinkedin></button>
              <button className="bg-[#cfe2ff] p-2 rounded-full hover:bg-[#DADEFF]"><TiSocialFacebook></TiSocialFacebook></button>
              <button className="bg-[#cfe2ff] p-2 rounded-full hover:bg-[#DADEFF]"><TiSocialTwitter ></TiSocialTwitter></button>
            </div>
          </div>
        </div>
      </div>
      {/* ------ second stap ------ */}
      <div className='flex flex-col lg:flex-row-reverse gap-10 max-w-7xl mx-auto'>
        {/* ------ right side ----- */}
        <div className='pt-30 w-full lg:w-2/3 px-4 py-12'>
          {/* --- Biography section --- */}
          <div className='space-y-10'>
            <h1 className='text-5xl font-semibold'>Short Biography</h1>
            <p className='text-lg space-y-5'>I enjoy getting to know my patients and building meaningful relationships. I understand <br />
              that each person is unique and that they have diverse cultural backgrounds, so I strive to <br />
              actively listen and empower them to be an advocate for the health and wellness goals that <br />
              are important to them. I’m dedicated to providing compassionate and individualized care by <br />
              providing patient education and practicing evidence-based medicine. I’m passionate about <br />
              practicing preventive medicine and helping my patients manage acute and chronic health <br />
              conditions, mental health, and overall well-being.
            </p>
            <p className='text-lg space-y-5'> I find joy by doing almost any outdoor activity, including hiking, running, and exploring with <br />
              our furbabies. I enjoy spending time with family and friends. I also strive to live mindfully <br />
              and intentionally by creating uplifting routines and relaxing rituals.</p>
          </div>
          {/* --- Education & Experience --- */}
          <div className='px-4 py-14'>
            <h2 className='text-5xl font-semibold py-10'>Education & Experience</h2>
            <table className="w-full">
              <tbody>
                <tr className='border-b border-gray-300 text-lg'>
                  <th className="p-6 text-left">Education</th>
                  <td className="p-6">
                    {doctor.educationExperience.education}
                  </td>
                </tr>

                <tr className='border-b border-gray-300 text-lg'>
                  <th className="p-6 text-left">Board Certification</th>
                  <td className="p-6">
                    {doctor.educationExperience.boardCertification}
                  </td>
                </tr>

                <tr className='border-b border-gray-300 text-lg'>
                  <th className="p-6 text-left">Field Of Expertise</th>
                  <td className="p-6">
                    {doctor.educationExperience.fieldOfExpertise}
                  </td>
                </tr>

                <tr className='border-b border-gray-300 text-lg'>
                  <th className="p-6 text-left">Years Of Practice</th>
                  <td className="p-6">
                    {doctor.educationExperience.yearsOfPractice}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          {/* --- Working Shifts --- */}
          <div className='px-4 py-14'>
            <h2 className='text-5xl font-semibold py-10'>Working Shifts</h2>
            <div className="bg-base-100 grid grid-cols-1 md:grid-cols-3 gap-5">
              {doctor.availableDays.map((day, index) => (
              <div 
              key={index}
              className="card-body items-center text-center rounded-xl shadow-md bg-base-200 transition delay-150 duration-300 ease-in-out hover:-translate-y-1 ...">
                <h2 className="card-title">{day}</h2>
                <p>{doctor.availableTime[index]}</p>
              </div>
              ))}
            </div>
          </div>
        </div>
        {/* --- form section --- */}
        <div className='w-full lg:w-1/3 px-4 py-12'>
          <div className="text-center mt-20">
            <h1 className="font-semibold text-2xl pb-5">Book a Consultation:</h1>
          </div>

          <form noValidate="" className="space-y-6">
            <div>
              <label htmlFor="name" className="text-sm font-bold"></label>
              <input id="name" type="text" placeholder="Your Full Name*" className="input w-full p-3 py-8 rounded dark:bg-gray-100" />
            </div>
            <div>
              <label htmlFor="phone" className="text-sm font-bold"></label>
              <input type="phone" placeholder="Your Phone" className="input w-full p-3 py-8 rounded dark:bg-gray-100" />
            </div>
            <div>
              <label htmlFor="message" className="text-sm font-bold"></label>
              <input type="date" placeholder="Select Date" className="input w-full p-3 py-8 rounded dark:bg-gray-100" />
            </div>
            <div className='flex gap-3'>
              <select defaultValue="Pick a color" className="select">
                {/* <option disabled={true}>08</option> */}
                <option>08</option>
                <option>09</option>
                <option>11</option>
                <option>12</option>
                <option>13</option>
                <option>14</option>
                <option>15</option>
                <option>16</option>
                <option>17</option>
                <option>18</option>
                <option>19</option>
              </select>
              <select defaultValue="Pick a color" className="select">
                {/* <option disabled={true}>30</option> */}
                <option>00</option>
                <option>10</option>
                <option>20</option>
                <option>30</option>
                <option>40</option>
                <option>50</option>
              </select>
            </div>
            <button type="submit" className="w-full p-3 text-sm font-bold tracking-wide uppercase rounded btn bg-[#5F6FFF] text-white hover:bg-[#434fbe]">book online</button>
          </form>
        </div>
      </div>

       {/* Back Button */}

                <div className="mt-10 px-8">
        <Link to="/doctors">
          <button className="btn btn-outline mb-20 hover:bg-[#5F6FFF] hover:text-white">
            ← Back to Our Doctors
          </button>
        </Link>
      </div>
    </div>
  );
};

export default DoctorsDetail;