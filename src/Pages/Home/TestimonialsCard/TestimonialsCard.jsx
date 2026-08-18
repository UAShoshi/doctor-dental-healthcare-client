import React from 'react';
import { Link } from 'react-router-dom';

const TestimonialsCard = () => {
    return (
        <div>
            <section className="py-2 mt-20 md:ml-20 ml-5">
                <div className="space-y-6">
                <div className="badge badge-soft bg-base-400 uppercase">Parents’ Testimonials</div>
                <h1 className="text-4xl font-semibold">What Families Say About Us</h1>
                <button><Link to="/testimonials" className="btn bg-[#434fbe] text-white rounded-xl px-10 uppercase py-6 hover:bg-[#5F6FFF]">view all reviews</Link></button>
            </div>
                <div className="container grid lg:grid-cols-3 md:grid-cols-2 mx-auto lg:px-10">
                    <div className="flex flex-col max-w-sm mx-4 my-6 shadow-lg">
                        <div className="px-4 py-12 rounded-t-lg sm:px-8 md:px-12">
                            <p className="relative px-6 py-1 text-lg italic text-center">
                                <div className="rating">
                                    <input type="radio" name="" className="mask mask-star-2 bg-orange-400" aria-label="1 star" />
                                    <input type="radio" name="" className="mask mask-star-2 bg-orange-400" aria-label="2 star" />
                                    <input type="radio" name="" className="mask mask-star-2 bg-orange-400" aria-label="3 star" />
                                    <input type="radio" name="" className="mask mask-star-2 bg-orange-400" aria-label="4 star" />
                                    <input type="radio" name="" className="mask mask-star-2 bg-orange-400" aria-label="5 star" defaultChecked/>
                                </div>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor" className="w-8 h-8 text-gray-400">
                                    <path d="M232,246.857V16H16V416H54.4ZM48,48H200V233.143L48,377.905Z"></path>
                                    <path d="M280,416h38.4L496,246.857V16H280ZM312,48H464V233.143L312,377.905Z"></path>
                                </svg>The dental fixing service was excellent. The doctor explained everything clearly and made me feel comfortable throughout the treatment.
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor" className="absolute right-0 w-8 h-8 text-gray-400">
                                    <path d="M280,185.143V416H496V16H457.6ZM464,384H312V198.857L464,54.1Z"></path>
                                    <path d="M232,16H193.6L16,185.143V416H232ZM200,384H48V198.857L200,54.1Z"></path>
                                </svg>
                            </p>
                        </div>
                        <div className="flex flex-col items-center justify-center p-8 rounded-b-lg">
                            <img src="https://i.pravatar.cc/150?img=47" alt="" className="w-16 h-16 mb-2 -mt-16 bg-center bg-cover rounded-full" />
                            <p className="text-xl font-semibold leading-tight">Sarah Ahmed</p>
                            <p className="text-sm uppercase">Dental Fixing Service</p>
                        </div>
                    </div>
                    <div className="flex flex-col max-w-sm mx-4 my-6 shadow-lg">
                        <div className="px-4 py-12 rounded-t-lg sm:px-8 md:px-12">
                            <p className="relative px-6 py-1 text-lg italic text-center">
                                <div className="rating">
                                    <input type="radio" name="" className="mask mask-star-2 bg-orange-400" aria-label="1 star" />
                                    <input type="radio" name="" className="mask mask-star-2 bg-orange-400" aria-label="2 star" />
                                    <input type="radio" name="" className="mask mask-star-2 bg-orange-400" aria-label="3 star" />
                                    <input type="radio" name="" className="mask mask-star-2 bg-orange-400" aria-label="4 star" />
                                    <input type="radio" name="" className="mask mask-star-2 bg-orange-400" aria-label="5 star" defaultChecked/>
                                </div>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor" className="w-8 h-8 text-gray-400">
                                    <path d="M232,246.857V16H16V416H54.4ZM48,48H200V233.143L48,377.905Z"></path>
                                    <path d="M280,416h38.4L496,246.857V16H280ZM312,48H464V233.143L312,377.905Z"></path>
                                </svg>I am very happy with my smile after the cosmetic dentistry treatment. The results look natural and beautiful.
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor" className="absolute right-0 w-8 h-8 text-gray-400">
                                    <path d="M280,185.143V416H496V16H457.6ZM464,384H312V198.857L464,54.1Z"></path>
                                    <path d="M232,16H193.6L16,185.143V416H232ZM200,384H48V198.857L200,54.1Z"></path>
                                </svg>
                            </p>
                        </div>
                        <div className="flex flex-col items-center justify-center p-8 rounded-b-lg">
                            <img src="https://i.pravatar.cc/150?img=12" alt="" className="w-16 h-16 mb-2 -mt-16 bg-center bg-cover rounded-full" />
                            <p className="text-xl font-semibold leading-tight">John Smith</p>
                            <p className="text-sm uppercase">Cosmetic Dentistry Service</p>
                        </div>
                    </div>
                    <div className="flex flex-col max-w-sm mx-4 my-6 shadow-lg">
                        <div className="px-4 py-12 rounded-t-lg sm:px-8 md:px-12">
                            <p className="relative px-6 py-1 text-lg italic text-center">
                                <div className="rating">
                                    <input type="radio" name="" className="mask mask-star-2 bg-orange-400" aria-label="1 star" />
                                    <input type="radio" name="" className="mask mask-star-2 bg-orange-400" aria-label="2 star" />
                                    <input type="radio" name="" className="mask mask-star-2 bg-orange-400" aria-label="3 star" />
                                    <input type="radio" name="" className="mask mask-star-2 bg-orange-400" aria-label="4 star" />
                                    <input type="radio" name="" className="mask mask-star-2 bg-orange-400" aria-label="5 star" defaultChecked/>
                                </div>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor" className="w-8 h-8 text-gray-400">
                                    <path d="M232,246.857V16H16V416H54.4ZM48,48H200V233.143L48,377.905Z"></path>
                                    <path d="M280,416h38.4L496,246.857V16H280ZM312,48H464V233.143L312,377.905Z"></path>
                                </svg>My dental implant treatment was smooth and professional. The staff were friendly and the final result exceeded my expectations.
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor" className="absolute right-0 w-8 h-8 text-gray-400">
                                    <path d="M280,185.143V416H496V16H457.6ZM464,384H312V198.857L464,54.1Z"></path>
                                    <path d="M232,16H193.6L16,185.143V416H232ZM200,384H48V198.857L200,54.1Z"></path>
                                </svg>
                            </p>
                        </div>
                        <div className="flex flex-col items-center justify-center p-8 rounded-b-lg">
                            <img src="https://i.pravatar.cc/150?img=32" alt="" className="w-16 h-16 mb-2 -mt-16 bg-center bg-cover rounded-full" />
                            <p className="text-xl font-semibold leading-tight">Emily Wilson</p>
                            <p className="text-sm uppercase">Dental Implants Service</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default TestimonialsCard;