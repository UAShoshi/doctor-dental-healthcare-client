import { Helmet } from "react-helmet-async";
import AppointmentSection from "./AppointmentSection";


const Appointment = () => {

 


    return (
        <div>
            <Helmet>
                <title>DentCare | Book an Appointment</title>
            </Helmet>
            <AppointmentSection></AppointmentSection>
        </div>
    );
};

export default Appointment;