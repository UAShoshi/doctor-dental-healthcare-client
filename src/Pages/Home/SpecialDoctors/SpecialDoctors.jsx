// import img1 from "../../../assets/speciality/General_physician.jpg";
// import img2 from "../../../assets/speciality/Gynecologist.jpg";
// import img3 from "../../../assets/speciality/Dermatologist.jpg";
// import img4 from "../../../assets/speciality/Pediatricians.jpg";
// import img5 from "../../../assets/speciality/Neurologist.jpg";
// import img6 from "../../../assets/speciality/Gastroenterologist.jpg";
import { GoArrowDownRight } from "react-icons/go";
import img1 from "../../../assets/team/doctor1.png";
import img2 from "../../../assets/team/doctor2.png";
import img3 from "../../../assets/team/doctor3.png";

import { TiSocialFacebook, TiSocialLinkedin } from "react-icons/ti";
import { Link } from "react-router-dom";

const SpecialDoctors = () => {
    return (
        <div>
            <div className='container lg:w-full mx-auto'>
                <h2 className='text-3xl font-semibold pb-3 mt-10 
                text-center'>Find by Speciality </h2>
                <p className='text-center'>Simply browse through
                    our extensive list of trusted doctors, schedule <br />your
                    appointment hassle-free.</p>
            </div>
            <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-5 mt-20'>
                <div className="card bg-base-100 shadow-sm hover:bg-base-200 rounded-2xl">

                    <div className="card-body">
                        <div className="pb-10">
                            <h2 className="card-title text-3xl">Sarah Ahmed</h2>
                            <p className='text-lg'>General Dentist</p>
                        </div>
                        <figure>
                            <img
                                src={img1}
                                alt="" className='rounded-4xl' />
                        </figure>
                        <div className="py-6 flex justify-between items-center">
                            <div className="card-actions">
                                <button><Link to="/doctorsdetail" className="uppercase flex justify-baseline font-medium transition delay-150 duration-700 ease-in-out hover:-translate-y-1 hover:scale-110 ...">Open Profile<GoArrowDownRight className="text-xl"></GoArrowDownRight></Link></button>
                            </div>
                            <div className="text-2xl flex gap-2">
                                <button className="hover:bg-gray-300 p-2 rounded-full bg-[#DADEFF]"><TiSocialLinkedin></TiSocialLinkedin></button>
                                <button className="hover:bg-gray-300 p-2 rounded-full bg-[#DADEFF]"><TiSocialFacebook></TiSocialFacebook></button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card bg-base-100 shadow-sm hover:bg-base-200 rounded-2xl">

                    <div className="card-body">
                        <div className="pb-10">
                            <h2 className="card-title text-3xl">Mohammad Rahman</h2>
                            <p className='text-lg'>Cosmetic Dentist</p>
                        </div>
                        <figure>
                            <img
                                src={img2}
                                alt="" className='rounded-4xl' />
                        </figure>
                        <div className="py-6 flex justify-between items-center">
                            <div className="card-actions">
                                <button><Link to="/doctorsdetail" className="uppercase flex justify-baseline font-medium transition delay-150 duration-700 ease-in-out hover:-translate-y-1 hover:scale-110 ...">Open Profile<GoArrowDownRight className="text-xl"></GoArrowDownRight></Link></button>
                            </div>
                            <div className="text-2xl flex gap-2">
                                <button className="hover:bg-gray-300 p-2 rounded-full bg-[#DADEFF]"><TiSocialLinkedin></TiSocialLinkedin></button>
                                <button className="hover:bg-gray-300 p-2 rounded-full bg-[#DADEFF]"><TiSocialFacebook></TiSocialFacebook></button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card bg-base-100 shadow-sm hover:bg-base-200 rounded-2xl">

                    <div className="card-body">
                        <div className="pb-10">
                            <h2 className="card-title text-3xl">Nusrat Jahan</h2>
                            <p className='text-lg'>Orthodontist</p>
                        </div>
                        <figure>
                            <img
                                src={img3}
                                alt="" className='rounded-4xl' />
                        </figure>
                        <div className="py-6 flex justify-between items-center">
                            <div className="card-actions">
                                <button><Link to="/doctorsdetail" className="uppercase flex justify-baseline font-medium transition delay-150 duration-700 ease-in-out hover:-translate-y-1 hover:scale-110 ...">Open Profile<GoArrowDownRight className="text-xl"></GoArrowDownRight></Link></button>
                            </div>
                            <div className="text-2xl flex gap-2">
                                <button className="hover:bg-gray-300 p-2 rounded-full bg-[#DADEFF]"><TiSocialLinkedin></TiSocialLinkedin></button>
                                <button className="hover:bg-gray-300 p-2 rounded-full bg-[#DADEFF]"><TiSocialFacebook></TiSocialFacebook></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="card-actions justify-center mt-20">
                <button><Link to="/doctors" className="btn bg-[#434fbe] text-white rounded-xl px-10 uppercase py-6 hover:bg-[#5F6FFF]">view all Doctors</Link></button>
            </div>















            {/* <div className="flex flex-wrap mt-16 mb-28 gap-8 justify-center">
                <div>
                    <div className="avatar">
                    <div className="w-24 rounded-full">
                        <img src={img1} />
                    </div>
                </div>
                <h1 className="pt-3">General physician</h1>
                </div>

                <div>
                    <div className="avatar">
                    <div className="w-24 rounded-full">
                        <img src={img2} />
                    </div>
                </div>
                <h1 className="pt-3">Gynecologist</h1>
                </div>

                <div>
                    <div className="avatar">
                    <div className="w-24 rounded-full">
                        <img src={img3} />
                    </div>
                </div>
                <h1 className="pt-3">Dermatologist</h1>
                </div>

                <div>
                    <div className="avatar">
                    <div className="w-24 rounded-full">
                        <img src={img4} />
                    </div>
                </div>
                <h1 className="pt-3">Pediatricians</h1>
                </div>

                <div>
                    <div className="avatar">
                    <div className="w-24 rounded-full">
                        <img src={img5} />
                    </div>
                </div>
                <h1 className="pt-3">Neurologist</h1>
                </div>

                <div>
                    <div className="avatar">
                    <div className="w-24 rounded-full">
                        <img src={img6} />
                    </div>
                </div>
                <h1 className="pt-3">Gastroenterologist</h1>
                </div>
            </div> */}
        </div>
    );
};

export default SpecialDoctors;