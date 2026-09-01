import { HiOutlineArrowRight } from "react-icons/hi";
import Cover from "../../Shared/Cover/Cover";
import ServicesCover from "../../assets/service/service-img4.jpg";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import AllServices from "./AllServices";



const Services = () => {
    const [services, setServices] = useState([]);

    useEffect(() => {
        fetch('services.json')
            .then(res => res.json())
            .then(data => setServices(data));
    }, [])


    return (
        <div>
            <div>
                <Cover img={ServicesCover} title="OUR SERVICES" directions="Services"></Cover>
            </div>
            <div className="text-center mt-20">
                <h1 className="text-3xl font-bold py-5">All Types of Dental Services</h1>
                <p>Our clinic offers all kinds of services and constantly study new technology to add new custom services to the list
                </p>
            </div>
            <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-5">
                {services.map(service => (
                    <AllServices
                        key={service._id}
                        service={service}
                    />
                ))}
            </div>
        </div>
    );
};

export default Services;