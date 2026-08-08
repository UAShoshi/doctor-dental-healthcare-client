import { HiOutlineArrowRight } from "react-icons/hi";
import Cover from "../../Shared/Cover/Cover";
import servicesCover from "../../assets/service/service-img4.jpg";
import services1 from "../../assets/service/service-img1.jpg";
import services2 from "../../assets/service/service-img2.jpg";
import services3 from "../../assets/service/service-img3.jpg";
import services4 from "../../assets/service/dental-exam.jpg";
import services5 from "../../assets/service/teeth-whitening.jpg";
import services6 from "../../assets/service/dental-filling.jpg";



const Services = () => {
    return (
        <div>
            <div>
                <Cover img={servicesCover} title="OUR SERVICES"></Cover>
            </div>
            <div className="text-center mt-20">
                <h1 className="text-3xl font-bold py-5">All Types of Dental Services</h1>
                <p>Our clinic offers all kinds of services and constantly study new technology to add new custom services to the list
                </p>
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
                            <button className="btn btn-link text-black font-bold 
                            text-[16px] my-5">Read More <HiOutlineArrowRight className="ml-3 mt-1"></HiOutlineArrowRight></button>
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
                            <button className="btn btn-link text-black font-bold 
                            text-[16px] my-5">Read More <HiOutlineArrowRight className="ml-3 mt-1"></HiOutlineArrowRight></button>
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
                            <button className="btn btn-link text-black font-bold 
                            text-[16px] my-5">Read More <HiOutlineArrowRight className="ml-3 mt-1"></HiOutlineArrowRight></button>
                        </div>
                    </div>
                </div>
                <div className="ccard bg-base-100 mt-20 shadow-sm">
                    <figure>
                        <img
                        className="rounded-t-2xl"
                            src={services4}
                            alt="" />
                    </figure>
                    <div className="card-body">
                        <h2 className="card-title py-5 text-2xl">Periodontal Therapy</h2>
                        <p>Periodontal therapy is technically all about restoring the diseased or damaged tissues to an original …

                        </p>
                        <div className="card-actions justify-items-center">
                            <button className="btn btn-link text-black font-bold 
                            text-[16px] my-5">Read More <HiOutlineArrowRight className="ml-3 mt-1"></HiOutlineArrowRight></button>
                        </div>
                    </div>
                </div>
                <div className="ccard bg-base-100 mt-20 shadow-sm">
                    <figure>
                        <img
                        className="rounded-t-2xl"
                            src={services5}
                            alt="" />
                    </figure>
                    <div className="card-body">
                        <h2 className="card-title py-5 text-2xl">Teeth Whitening</h2>
                        <p>Our dentists will clean up your teeth, conduct a thorough check before covering the teeth with a new …</p>
                        <div className="card-actions justify-items-center">
                            <button className="btn btn-link text-black font-bold 
                            text-[16px] my-5">Read More <HiOutlineArrowRight className="ml-3 mt-1"></HiOutlineArrowRight></button>
                        </div>
                    </div>
                </div>
                <div className="ccard bg-base-100 mt-20 shadow-sm">
                    <figure>
                        <img
                        className="rounded-t-2xl"
                            src={services6}
                            alt="" />
                    </figure>
                    <div className="card-body">
                        <h2 className="card-title py-5 text-2xl">Preventive Dentistry</h2>
                        <p>This is an essential service to help patients avoid cavities, gum disease, enamel wear, etc. & keep the …</p>
                        <div className="card-actions justify-items-center">
                            <button className="btn btn-link text-black font-bold 
                            text-[16px] my-5">Read More <HiOutlineArrowRight className="ml-3 mt-1"></HiOutlineArrowRight></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Services;