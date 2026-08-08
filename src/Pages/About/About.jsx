
import about1 from "../../assets/about/about-img2.jpg";
import Cover from "../../Shared/Cover/Cover";
import aboutImg from "../../assets/about/about-img1.jpg";
import aboutImg2 from "../../assets/about/about-img3.jpg";
import aboutImg3 from "../../assets/about/about-img4.jpg";
import aboutImg4 from "../../assets/about/about-img5.jpg";



const About = () => {
    return (
        <div>
            <div>
                <Cover img={aboutImg} title="ABOUT US"></Cover>
            </div>
            <div className="text-center my-20">
                <h1 className="font-bold text-5xl pb-5">
                    Why We are the Best Clinic?</h1>
                <p>At our Pediatric Dentistry & Orthodontics Clinic, we believe every child deserves a positive, stress-free dental experience.</p>
            </div>
            <div className="mt-20 max-w-10/12 mx-auto">
                <div className="hero rounded-lg">
                    <div className="hero-content flex-col lg:flex-row gap-14">
                        <img
                            src={about1}
                            className="max-w-sm rounded-lg shadow-2xl"
                        />
                        <div>
                            <p className="pb-12">
                                Welcome to Prescripto, your trusted partner in managing your
                                healthcare needs conveniently and efficiently. At Prescripto, we
                                understand the challenges individuals face when it comes to
                                scheduling doctor appointments and managing their health record
                            </p>
                            <p className="pb-12">Prescripto is committed to excellence in healthcare technology.
                                We continuously strive to enhance our platform, integrating the
                                latest advancements to improve user experience and deliver superior
                                service. Whether you're booking your first appointment or managing
                                ongoing care, Prescripto is here to support you every step of the way.</p>
                            <b>Our Vision</b>
                            <p className="pt-12">Our vision at Prescripto is to create a seamless healthcare experience for every
                                user. We aim to bridge the gap between patients and healthcare providers, making
                                it easier for you to access the care you need, when you need it.</p>
                        </div>
                    </div>
                </div>
            </div>
            {/* 2nd part */}
            <div className="hero min-h-screen">
                <div className="hero-content gap-10 flex-col lg:flex-row-reverse">
                    <img
                        src={aboutImg2}
                        className="max-w-md rounded-lg shadow-2xl"
                    />
                    <div className="space-y-8">
                        <h1 className="text-5xl font-semibold">Our Story</h1>
                        <p>
                            We believe that everyone deserves a healthy, beautiful smile. That’s why <br /> we offer a 
                            comprehensive range of dental services to meet your needs, <br /> from routine cleanings and 
                            exams to advanced treatments like dental implants and orthodontics.
                        </p>
                        <div className="flex gap-5 w-80">
                            <img className="rounded-3xl" src={aboutImg3} alt="" />
                            <img className="rounded-3xl" src={aboutImg4} alt="" />
                        </div>
                    </div>
                </div>
            </div>

            <h1 className="mb-10 text-3xl text-gray-700 mt-20 px-5">WHY <span
                className="font-semibold">CHOOSE US</span></h1>
            <div>
                <div className="hero bg-base-200 mb-10 p-10">
                    <div className="hero-content gap-0 flex-col lg:flex-row">

                        <div className="border-r-0 border-2 border-gray-400 p-12">
                            <h1 className="text-2xl font-bold">Efficiency:</h1>
                            <p className="py-6">
                                Streamlined appointment scheduling
                                that fits into your busy lifestyle.
                            </p>
                        </div>
                        <div className="border-r-0 border-2 border-gray-400 p-12">
                            <h1 className="text-2xl font-bold">Convenience:</h1>
                            <p className="py-6">
                                Access to a network of trusted healthcare professionals in your area.
                            </p>
                        </div>
                        <div className="border-2 border-gray-400 p-12">
                            <h1 className="text-2xl font-bold">Personalization:</h1>
                            <p className="py-6">
                                Tailored recommendations and reminders to help you stay on top of your health.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;