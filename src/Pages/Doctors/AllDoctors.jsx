import { GoArrowDownRight } from "react-icons/go";
import { TiSocialFacebook, TiSocialLinkedin } from "react-icons/ti";
import { Link } from "react-router-dom";


const AllDoctors = ({ doctor }) => {
    const {_id, doctorImage, doctorName, specialization,
        // phone, email, location, qualification, hospital
    }
        = doctor;
    return (
        <div>
            <div className="card bg-base-100 shadow-sm hover:bg-base-200 rounded-2xl">

                <div className="card-body">
                    <div className="pb-10">
                        <h2 className="card-title text-3xl">{doctorName}</h2>
                        <p className='text-lg'>{specialization}</p>
                    </div>
                    <figure>
                        <img
                            src={doctorImage}
                            alt="" className='rounded-4xl' />
                    </figure>
                    <div className="py-6 flex justify-between items-center">
                        <div className="card-actions">
                            <button><Link to={`/doctorsdetail/${_id}`} className="uppercase flex justify-baseline">Open Profile<GoArrowDownRight className="text-xl"></GoArrowDownRight></Link></button>
                        </div>
                        <div className="text-2xl flex gap-2">
                            <button className="hover:bg-gray-300 p-2 rounded-full bg-[#DADEFF]"><TiSocialLinkedin></TiSocialLinkedin></button>
                            <button className="hover:bg-gray-300 p-2 rounded-full bg-[#DADEFF]"><TiSocialFacebook></TiSocialFacebook></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AllDoctors;