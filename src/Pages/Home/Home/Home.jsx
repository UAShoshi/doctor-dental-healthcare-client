import AboutCard from "../AboutCard/AboutCard";
import Banner from "../Banner/Banner";
import ServicesCard from "../ServicesCard/ServicesCard";
import Works from "../Works/Works";
import SpecialDoctors from "../SpecialDoctors/SpecialDoctors";
import TestimonialsCard from "../TestimonialsCard/TestimonialsCard";
import { Helmet } from "react-helmet-async";
import AppointmentSection from "../../Appointment/AppointmentSection";


const Home = () => {
    return (
        <div>
            <Helmet>
                <title>DentCare | Home</title>
            </Helmet>
            <Banner></Banner>
            <AboutCard></AboutCard>
            <ServicesCard></ServicesCard>
            <SpecialDoctors></SpecialDoctors>
            <TestimonialsCard></TestimonialsCard>
            <Works></Works>
            <AppointmentSection></AppointmentSection>
        </div>
    );
};

export default Home;