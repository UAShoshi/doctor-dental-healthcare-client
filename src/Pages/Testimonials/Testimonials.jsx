import React, { useEffect, useState } from 'react';
import AllTestimonials from './AllTestimonials';
import TestimonialCover from '../../assets/author/Testimonial-cover.jpg';
import Cover from '../../Shared/Cover/Cover';
// import AllTestimonials from './AllTestimonials';

const Testimonials = () => {

    const[testimonials, setTestimonials] = useState([]);

    useEffect(() =>{
        fetch('testimonials.json')
        .then(res => res.json())
        .then(data => setTestimonials(data));
    }, [])


    return (
        <div>
            <div>
                <Cover img={TestimonialCover} title="TESTIMONIALS" priceing="Testimonials"></Cover>
            </div>
            <section className="py-20">
                <div className="container flex flex-col items-center mx-auto mb-12 md:p-10 md:px-12">
                    <h1 className="p-4 text-4xl font-semibold leading-none text-center">What our customers are saying</h1>
                    <p>More than 250 five-star reviews on Google</p>
                </div>
                <div className="container grid lg:grid-cols-3 md:grid-cols-2 mx-auto lg:px-10">
                    
                    {testimonials.map(testimonial => (
                    <AllTestimonials
                        key={testimonial._id}
                        testimonial={testimonial}
                    />
                ))}

                    {/* <div className="flex flex-col max-w-sm mx-4 my-6 shadow-lg">
                        <div className="px-4 py-12 rounded-t-lg sm:px-8 md:px-12">
                            <p className="relative px-6 py-1 text-lg italic text-center dark:text-gray-800">
                                <div className="rating">
                                    <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" aria-label="1 star" />
                                    <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" aria-label="2 star" />
                                    <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" aria-label="3 star" />
                                    <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" aria-label="4 star" />
                                    <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" aria-label="5 star" defaultChecked/>
                                </div>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor" className="w-8 h-8 text-gray-400">
                                    <path d="M232,246.857V16H16V416H54.4ZM48,48H200V233.143L48,377.905Z"></path>
                                    <path d="M280,416h38.4L496,246.857V16H280ZM312,48H464V233.143L312,377.905Z"></path>
                                </svg>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptatibus quibusdam, eligendi exercitationem molestias possimus facere.
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor" className="absolute right-0 w-8 h-8 text-gray-400">
                                    <path d="M280,185.143V416H496V16H457.6ZM464,384H312V198.857L464,54.1Z"></path>
                                    <path d="M232,16H193.6L16,185.143V416H232ZM200,384H48V198.857L200,54.1Z"></path>
                                </svg>
                            </p>
                        </div>
                        <div className="flex flex-col items-center justify-center p-8 rounded-b-lg">
                            <img src="https://source.unsplash.com/50x50/?portrait?2" alt="" className="w-16 h-16 mb-2 -mt-16 bg-center bg-cover rounded-full" />
                            <p className="text-xl font-semibold leading-tight">Distinctio Animi</p>
                            <p className="text-sm uppercase">Aliquam illum</p>
                        </div>
                    </div> */}
                </div>
            </section>
        </div>
    );
};

export default Testimonials;