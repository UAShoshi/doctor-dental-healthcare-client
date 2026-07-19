
import img1 from "../../../../assets/speciality/General_physician.jpg"
import img2 from "../../../../assets/speciality/Gynecologist.jpg"
import img3 from "../../../../assets/speciality/Dermatologist.jpg"
import img4 from "../../../../assets/speciality/Pediatricians.jpg"
import img5 from "../../../../assets/speciality/Neurologist.jpg"
import img6 from "../../../../assets/speciality/Gastroenterologist.jpg"

const Speciality = () => {
    return (
        <div>
            <div className='container lg:w-full mx-auto'>
                <h2 className='text-3xl font-semibold pb-3 mt-10 
                text-center'>Find by Speciality </h2>
                <p className='text-center'>Simply browse through
                    our extensive list of trusted doctors, schedule <br />your
                    appointment hassle-free.</p>
            </div>
            <div className="flex flex-wrap mt-16 mb-28 gap-8 justify-center">
                <div>
                    <div className="avatar">
                    <div className="w-24 rounded-full">
                        <img src={img1} />
                    </div>
                </div>
                <h1 className="pt-3">General physician</h1>
                </div>

                <div>
                    <div className="avatar">
                    <div className="w-24 rounded-full">
                        <img src={img2} />
                    </div>
                </div>
                <h1 className="pt-3">Gynecologist</h1>
                </div>

                <div>
                    <div className="avatar">
                    <div className="w-24 rounded-full">
                        <img src={img3} />
                    </div>
                </div>
                <h1 className="pt-3">Dermatologist</h1>
                </div>

                <div>
                    <div className="avatar">
                    <div className="w-24 rounded-full">
                        <img src={img4} />
                    </div>
                </div>
                <h1 className="pt-3">Pediatricians</h1>
                </div>

                <div>
                    <div className="avatar">
                    <div className="w-24 rounded-full">
                        <img src={img5} />
                    </div>
                </div>
                <h1 className="pt-3">Neurologist</h1>
                </div>

                <div>
                    <div className="avatar">
                    <div className="w-24 rounded-full">
                        <img src={img6} />
                    </div>
                </div>
                <h1 className="pt-3">Gastroenterologist</h1>
                </div>
            </div>
        </div>
    );
};

export default Speciality;