
import img1 from "../../../assets/work/doctor.jpg"
import img2 from "../../../assets/work/location.jpg"
import img3 from "../../../assets/work/appointment.jpg"



const Works = () => {
    return (
        <div>
            <div className='container lg:w-full mx-auto'>
                <h2 className='text-3xl font-semibold pb-3 
                text-center'>providing the best <br />
                    medical services</h2>
                <p className='text-center'>World-class care
                    for everyone. Our health system offers <br
                    /> unmatched, expert health care</p>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 
            lg:grid-cols-3 gap-5 mt-5 items-center justify-center mb-20'>
                <div className="card bg-base-100">
                    <figure className="px-10">
                        <img
                            src={img1}
                            alt="Shoes"
                            className="rounded-xl" />
                    </figure>
                    <div className="card-body items-center text-center">
                        <h2 className="card-title">Find a Doctor</h2>
                        <p>World-class care for everyone. Our health System offers unmatched, expert health care. from the lab to the clinic.</p>
                        <div className="card-actions">
                            <button className="btn btn-circle">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="size-[1.2em]"><path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" /></svg>
                            </button>
                        </div>
                    </div>
                </div>
                <div className="card bg-base-100">
                    <figure className="px-10">
                        <img
                            src={img2}
                            alt="Shoes"
                            className="rounded-xl" />
                    </figure>
                    <div className="card-body items-center text-center">
                        <h2 className="card-title">Find a Location</h2>
                        <p>World-class care for everyone. Our health System offers unmatched, expert health care. from the lab to the clinic.</p>
                        <div className="card-actions">
                            <button className="btn btn-circle">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="size-[1.2em]"><path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" /></svg>
                            </button>
                        </div>
                    </div>
                </div>
                <div className="card bg-base-100">
                    <figure className="px-10">
                        <img
                            src={img3}
                            alt="Shoes"
                            className="rounded-xl" />
                    </figure>
                    <div className="card-body items-center text-center">
                        <h2 className="card-title">Book Appointment</h2>
                        <p>World-class care for everyone. Our health System offers unmatched, expert health care. from the lab to the clinic.</p>
                        <div className="card-actions">
                            <button className="btn btn-circle">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="size-[1.2em]"><path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" /></svg>
                            </button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Works;