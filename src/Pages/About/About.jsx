
import about1 from "../../assets/about/about-img2.jpg"
import Cover from "../../Shared/Cover/Cover";
import aboutImg from "../../assets/about/about-img1.jpg"


const About = () => {
    return (
        <div>
            <div>
                <Cover img={aboutImg} title="ABOUT"></Cover>
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