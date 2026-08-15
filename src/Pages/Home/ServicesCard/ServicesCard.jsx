import React from 'react';
import { Link } from 'react-router-dom';
import services1 from "../../../assets/service/service-img1.jpg";
import services2 from "../../../assets/service/service-img2.jpg";
import services3 from "../../../assets/service/service-img3.jpg";
import { HiOutlineArrowRight } from 'react-icons/hi';


const ServicesCard = () => {
    return (
        <div className='mt-20 md:ml-20 ml-5'>
            <div className="space-y-6">
                <div className="badge badge-soft bg-base-400 uppercase">Our services</div>
                <h1 className="text-4xl font-semibold">Gentle Care for Young Smiles</h1>
                <button><Link to="/services" className="btn bg-[#434fbe] text-white rounded-xl px-10 uppercase py-6 hover:bg-[#5F6FFF]">view all services</Link></button>
            </div>
            <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-5">
                <div className="ccard bg-base-100 mt-20 shadow-sm">
                    <img
                        className="rounded-t-2xl"
                        src={services1}
                        alt="" />
                    <div className="card-body">
                        <h2 className="card-title py-5 text-2xl">Dental Fixing Service</h2>
                        <p>Our dental fixing service And professional solutions for broken,
                            chipped, or missing teeth, ensuring a healthy, confident smile with advanced treatments.</p>
                        <div className="card-actions justify-items-center">
                            <button><Link to="/servicesdetail" className="btn btn-link text-black font-bold 
                                        text-[16px] my-5">Read More <HiOutlineArrowRight className="ml-3 mt-1"></HiOutlineArrowRight></Link></button>
                        </div>
                    </div>
                </div>
                <div className="ccard bg-base-100 mt-20 shadow-sm">
                    <figure>
                        <img className="rounded-t-2xl"
                            src={services2}
                            alt="" />
                    </figure>
                    <div className="card-body">
                        <h2 className="card-title py-5 text-2xl">Cosmetic Dentistry</h2>
                        <p>Cosmetic dentistry mainly concerns improving the appearance of your teeth, including whitening & cleaning …</p>
                        <div className="card-actions justify-items-center">
                            <button><Link to="/servicesdetail" className="btn btn-link text-black font-bold 
                                        text-[16px] my-5">Read More <HiOutlineArrowRight className="ml-3 mt-1"></HiOutlineArrowRight></Link></button>
                        </div>
                    </div>
                </div>
                <div className="ccard bg-base-100 mt-20 shadow-sm">
                    <figure>
                        <img
                            className="rounded-t-2xl"
                            src={services3}
                            alt="" />
                    </figure>
                    <div className="card-body">
                        <h2 className="card-title py-5 text-2xl">Dental Implants</h2>
                        <p>Dental implants replace the missing tooth by implanting artificial roots into the jaw under surgical …</p>
                        <div className="card-actions justify-items-center">
                            <button><Link to="/servicesdetail" className="btn btn-link text-black font-bold 
                                        text-[16px] my-5">Read More <HiOutlineArrowRight className="ml-3 mt-1"></HiOutlineArrowRight></Link></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ServicesCard;