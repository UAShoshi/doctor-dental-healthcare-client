import { GoArrowDownRight } from "react-icons/go";
import { TiSocialFacebook, TiSocialLinkedin } from "react-icons/ti";


const AllDoctors = ({ doctor }) => {
    const { doctorImage, doctorName, specialization,
        // phone, email, location, qualification, hospital
    }
        = doctor;
    return (
        <div>
            <div className="card bg-base-100 shadow-sm hover:bg-gray-200 rounded-2xl">

                <div className="card-body">
                    <div className="pb-12">
                        <h2 className="card-title text-3xl">{doctorName}</h2>
                        <p className='text-lg'>{specialization}</p>
                    </div>
                    <figure>
                        <img
                            src={doctorImage}
                            alt="Shoes" className='rounded-4xl' />
                    </figure>
                    <div className="py-12 flex justify-between items-center">
                        <div className="card-actions ">
                            <button className="uppercase flex justify-baseline">Open Profile<GoArrowDownRight className="text-xl"></GoArrowDownRight></button>
                        </div>
                        <div className="text-2xl flex gap-2">
                            <button className="bg-gray-300 p-2 rounded-full"><TiSocialLinkedin></TiSocialLinkedin></button>
                            <button className="bg-gray-300 p-2 rounded-full"><TiSocialFacebook></TiSocialFacebook></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AllDoctors;