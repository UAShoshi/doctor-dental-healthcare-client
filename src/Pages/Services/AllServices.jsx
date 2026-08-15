import React from 'react';
import { HiOutlineArrowRight } from 'react-icons/hi';
import { Link } from 'react-router-dom';

const AllServices = ({service}) => {
    const {_id, serviceImage, serviceName, serviceDescription} = service;

    return (
        <div>
            <div className="ccard bg-base-100 mt-20 shadow-sm">
                    <img
                        className="rounded-t-2xl"
                        src={serviceImage}
                        alt="" />
                    <div className="card-body">
                        <h2 className="card-title py-5 text-2xl">{serviceName}</h2>
                        <p>{serviceDescription}</p>
                        <div className="card-actions justify-items-center">
                            <button><Link to={`/servicesdetail/${_id}`} className="btn btn-link text-black font-bold 
                                        text-[16px] my-5">Read More <HiOutlineArrowRight className="ml-3 mt-1"></HiOutlineArrowRight></Link></button>
                        </div>
                    </div>
                </div>
        </div>
    );
};

export default AllServices;