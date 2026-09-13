import { Link } from "react-router-dom";
import {
    FaFacebookF,
    FaTwitter,
    FaLinkedinIn,
    FaMapMarkerAlt,
    FaPhoneAlt,
    FaEnvelope,
} from "react-icons/fa";
import dentCareLogo from "../../assets/author/dentCare-logo.jpg";


const Footer = () => {
    return (
        <footer className="bg-slate-900 text-white">

            <div className="max-w-7xl mx-auto px-4 py-12">

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

                    {/* Logo & Description */}
                    <div>
                        <Link
                            to="/"
                            className="flex items-center gap-2 w-fit"
                        >
                            <img
                                src={dentCareLogo}
                                alt="DentalCare Logo"
                                className="w-8 h-8 object-contain rounded-full"
                            />

                            <span className="text-2xl font-bold text-white">
                                Dent<span className="text-[#5F6FFF]">Care</span>
                            </span>
                        </Link>

                        <p className="text-gray-400 mt-4 leading-6">
                            Your trusted partner for quality dental care.
                            We provide modern and professional dental services.
                        </p>

                        <div className="flex gap-3 mt-5">

                            <a
                                href="https://facebook.com"
                                target="_blank"
                                rel="noreferrer"
                                className="bg-slate-800 p-3 rounded-full hover:bg-[#5F6FFF]"
                            >
                                <FaFacebookF />
                            </a>

                            <a
                                href="https://twitter.com"
                                target="_blank"
                                rel="noreferrer"
                                className="bg-slate-800 p-3 rounded-full hover:bg-[#5F6FFF]"
                            >
                                <FaTwitter />
                            </a>

                            <a
                                href="https://linkedin.com"
                                target="_blank"
                                rel="noreferrer"
                                className="bg-slate-800 p-3 rounded-full hover:bg-[#5F6FFF]"
                            >
                                <FaLinkedinIn />
                            </a>

                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-lg font-semibold mb-5">
                            Quick Links
                        </h3>

                        <div className="flex flex-col gap-3 text-gray-400">

                            <Link to="/" className="hover:text-[#5F6FFF]">
                                Home
                            </Link>

                            <Link to="/about" className="hover:text-[#5F6FFF]">
                                About Us
                            </Link>

                            <Link to="/services" className="hover:text-[#5F6FFF]">
                                Services
                            </Link>

                            <Link to="/doctors" className="hover:text-[#5F6FFF]">
                                Doctors
                            </Link>

                            <Link to="/blogs" className="hover:text-[#5F6FFF]">
                                Blogs
                            </Link>

                            <Link to="/contact" className="hover:text-[#5F6FFF]">
                                Contact
                            </Link>

                        </div>
                    </div>

                    {/* Services */}
                    <div>
                        <h3 className="text-lg font-semibold mb-5">
                            Our Services
                        </h3>

                        <div className="flex flex-col gap-3 text-gray-400">

                            <Link to="/servicesdetail/service001" className="hover:text-[#5F6FFF]">
                                Dental Fixing
                            </Link>

                            <Link to="/servicesdetail/service002" className="hover:text-[#5F6FFF]">
                                Cosmetic Dentistry
                            </Link>

                            <Link to="/servicesdetail/service003" className="hover:text-[#5F6FFF]">
                                Dental Implants
                            </Link>

                            <Link to="/servicesdetail/service004" className="hover:text-[#5F6FFF]">
                                Routine Dental Exam
                            </Link>

                            <Link to="/servicesdetail/service005" className="hover:text-[#5F6FFF]">
                                Teeth Whitening
                            </Link>

                            <Link to="/servicesdetail/service006" className="hover:text-[#5F6FFF]">
                                Dental Fillings
                            </Link>

                        </div>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="text-lg font-semibold mb-5">
                            Contact Us
                        </h3>

                        <div className="space-y-4 text-gray-400">

                            <div className="flex gap-3">
                                <FaMapMarkerAlt className="text-[#5F6FFF] mt-1" />

                                <p>
                                    123 Dental Street,
                                    <br />
                                    Dhaka, Bangladesh
                                </p>
                            </div>

                            <a
                                href="tel:+8801234567890"
                                className="flex gap-3 hover:text-[#5F6FFF]"
                            >
                                <FaPhoneAlt className="text-[#5F6FFF]" />
                                +880 1234-567890
                            </a>

                            <a
                                href="mailto:info@dentalcare.com"
                                className="flex gap-3 hover:text-[#5F6FFF]"
                            >
                                <FaEnvelope className="text-[#5F6FFF]" />
                                info@dentalcare.com
                            </a>

                        </div>
                    </div>

                </div>

                {/* Copyright */}
                <div className="border-t border-slate-700 mt-10 pt-6 text-center">

                    <p className="text-gray-400 text-sm">
                        © {new Date().getFullYear()}{" "}
                        <span className="text-[#5F6FFF] font-semibold">
                            DentalCare
                        </span>
                        . All rights reserved.
                    </p>

                </div>

            </div>

        </footer>
    );
};

export default Footer;