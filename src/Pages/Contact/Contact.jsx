import contactImg from "../../assets/contact/contact img.jpg"
import Cover from "../../Shared/Cover/Cover";
import contact1 from "../../assets/contact/contact_image.png"

const Contact = () => {
    return (
        <div>
            <div>
                <Cover img={contactImg} title="CONTACT"></Cover>
            </div>
            <div className="hero bg-base-200 min-h-screen">
                <div className="gap-20 hero-content flex-col lg:flex-row">
                    <img
                        src={contact1}
                        className="max-w-sm rounded-lg shadow-2xl"
                    />
                    <div className="font-semibold">
                        <h1 className="text-2xl font-semibold">OUR OFFICE</h1>
                        <p className="py-6">
                            54709 Willms Station <br />
                            Suite 350, Washington, USA
                        </p>
                        <p>Tel: (415) 555‑0132 <br />
                            Email: greatstackdev@gmail.com
                        </p>
                        <h2 className="text-2xl font-semibold pt-10">Careers at PRESCRIPTO</h2>
                        <p className="pt-5">Learn more about our teams and job openings.</p>
                        <button className="btn btn-dash my-5">Explore Jobs</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;