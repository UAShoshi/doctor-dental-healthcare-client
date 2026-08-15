import contactImg from "../../assets/contact/contact img.jpg";
import Cover from "../../Shared/Cover/Cover";
import contact1 from "../../assets/contact/contact_image.png";
import contactUs from "../../assets/contact/contact_us image.jpg"

const Contact = () => {
    return (
        <div>
            <div>
                <Cover img={contactImg} title="CONTACT US" about="Contact us"></Cover>
            </div>
            <div className="hero bg-base-200 min-h-screen">
                <div className="gap-20 hero-content flex-col lg:flex-row">
                    <img
                        src={contact1}
                        className="md:max-w-sm rounded-lg shadow-2xl"
                    />
                    <div className="font-semibold">
                        <h1 className="text-2xl font-semibold">OUR OFFICE</h1>
                        <p className="py-6">
                            House 42, Road 15, Avenue 4, <br />
                            Sector 11, Uttara, Dhaka 1230, Bangladesh
                        </p>
                        <p>Tel: (+880) 1712345678 <br />
                            Email: greatstackdev@gmail.com
                        </p>
                        <h2 className="text-2xl font-semibold pt-10">CAREERS AT PRESCRIPTO</h2>
                        <p className="pt-5">Learn more about our teams and job openings.</p>
                        <button className="btn btn-dash my-5">Explore Jobs</button>
                    </div>
                </div>
            </div>
            {/* ------ */}
            <div>
                <div className="text-center my-20">
                    <h1 className="font-bold text-5xl pb-5">Ask a Question</h1>
                    <p>If you have any questions, you can contact us. Please, fill out the form below.</p>
                </div>
              <section className="py-10">
				<div className="grid max-w-6xl grid-cols-1 px-6 mx-auto lg:px-8 md:grid-cols-2 gap-10">
					<div className="py-6 md:py-0 md:px-6">
                        <img src={contactUs} alt="" />
					</div>
					<form noValidate="" className="space-y-6">
						<div>
							<label htmlFor="name" className="text-sm font-bold"></label>
							<input id="name" type="text" placeholder="Your Name*" className="input w-full p-3 py-8 rounded dark:bg-gray-100" />
						</div>
						<div>
							<label htmlFor="email" className="text-sm font-bold"></label>
							<input id="email" type="email" placeholder="Your Mail*" className="input w-full p-3 py-8 rounded dark:bg-gray-100" />
						</div>
                        <div>
                            <label htmlFor="phone" className="text-sm font-bold"></label>
                            <input type="phone" placeholder="Phone" className="input w-full p-3 py-8 rounded dark:bg-gray-100" />
                        </div>
						<div>
							<label htmlFor="message" className="text-sm font-bold"></label>
							<textarea id="message" rows="6" placeholder="Your Message..." className="textarea w-full p-10 rounded dark:bg-gray-100"></textarea>
						</div>
						<button type="submit" className="w-full p-3 text-sm font-bold tracking-wide uppercase rounded bg-[#5F6FFF] text-white btn">Send Message</button>
					</form>
				</div>
			</section>
            </div>
        </div>
    );
};

export default Contact;