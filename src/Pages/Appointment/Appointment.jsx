import AppointmentImg from '../../assets/team/Appointment.jpg'

const Appointment = () => {
    return (
        <div>
            {/* ---- Book an Appointment ---- */}
            <div className="hero bg-base-200 min-h-screen pt-30 pb-30">
                <div className="w-full hero-content flex-col lg:flex-row gap-20">
                    <img
                        alt=""
                        src={AppointmentImg}
                        className="w-1/2 rounded-lg shadow-2xl"
                    />
                    {/* ---- form ---- */}
                    <div className='w-1/2 mx-auto'>
                        <div className="text-center">
                            <h1 className="font-semibold text-2xl pb-5">Book an Appointment</h1>
                            <p className='pb-20'>Our experienced team strives to provide a positive, stress-free <br />experience.</p>
                        </div>

                        <form noValidate="" className="space-y-6">
                            <div className='flex gap-3'>
                                <fieldset className="fieldset w-full">
                                    <legend className="text-sm mb-2 uppercase">Services</legend>
                                    <select defaultValue="Pick a browser" className="select p-7 rounded-xl border-0">
                                        <option disabled={true}>Select Service</option>
                                        <option>Dental Fixing Service</option>
                                        <option>Cosmetic Dentistry</option>
                                        <option>Dental Implants</option>
                                        <option>Routine Dental Exam</option>
                                        <option>Teeth Whitening</option>
                                        <option>Dental Fillings</option>
                                    </select>
                                </fieldset>
                                <fieldset className="fieldset w-full">
                                    <legend className="text-sm mb-2 uppercase">Doctor</legend>
                                    <select className="select p-7 rounded-xl border-0">
                                        <option disabled={true}>Select Doctor</option>
                                        <option>Sarah Ahmed</option>
                                        <option>Mohammad Rahman</option>
                                        <option>Nusrat Jahan</option>
                                        <option>Tanvir Hasan</option>
                                        <option>Farzana Akter</option>
                                        <option>Imran Kabir</option>
                                    </select>
                                </fieldset>
                            </div>
                            <div className='flex gap-3'>
                                <fieldset className="fieldset w-full">
                                    <label htmlFor="name" className="text-sm mb-2">YOUR NAME *</label>
                                    <input id="name" type="text" placeholder="Your Full Name*" className="input p-7 rounded-xl border-0" />
                                </fieldset>
                                <fieldset className="fieldset w-full">
                                    <label htmlFor="phone" className="text-sm mb-2">YOUR PHONE</label>
                                    <input type="phone" placeholder="Your Phone" className="input p-7 rounded-xl border-0" />
                                </fieldset>
                            </div>
                            <div className='flex gap-3'>
                                <fieldset className="fieldset w-full">
                                    <label htmlFor="message" className="text-sm mb-2">DATE</label>
                                    <input type="date" placeholder="Select Date" className="input p-7 rounded-xl border-0" />
                                </fieldset>
                                <div className='w-full'>
                                    <legend className="text-sm mb-2 uppercase">Time</legend>
                                    <div className='flex gap-3'>
                                        <fieldset className="fieldset w-1/2">
                                            <select defaultValue="Pick a browser" className="select p-7 rounded-xl border-0">
                                                <option disabled={true}>Select</option>
                                                <option>00</option>
                                                <option>01</option>
                                                <option>02</option>
                                                <option>03</option>
                                                <option>04</option>
                                                <option>05</option>
                                                <option>06</option>
                                                <option>07</option>
                                                <option>08</option>
                                                <option>09</option>
                                                <option>10</option>
                                            </select>
                                        </fieldset>
                                        <fieldset className="fieldset w-1/2">
                                            <select defaultValue="Pick a browser" className="select p-7 rounded-xl border-0">
                                                <option disabled={true}>Select</option>
                                                <option>00</option>
                                                <option>01</option>
                                                <option>02</option>
                                                <option>03</option>
                                                <option>04</option>
                                                <option>05</option>
                                                <option>06</option>
                                                <option>07</option>
                                                <option>08</option>
                                                <option>09</option>
                                                <option>10</option>
                                                <option>00</option>
                                                <option>11</option>
                                                <option>12</option>
                                                <option>13</option>
                                                <option>14</option>
                                                <option>15</option>
                                                <option>16</option>
                                                <option>17</option>
                                                <option>18</option>
                                                <option>19</option>
                                                <option>20</option>
                                                <option>30</option>
                                                <option>40</option>
                                                <option>50</option>
                                            </select>
                                        </fieldset>
                                    </div>
                                </div>
                            </div>
                            <button type="submit" className="w-full p-3 text-sm font-bold tracking-wide uppercase rounded btn bg-[#5F6FFF] text-white hover:bg-[#434fbe]">Make an Appointment</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Appointment;