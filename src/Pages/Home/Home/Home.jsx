import AboutCard from "../AboutCard/AboutCard";
import Banner from "../Banner/Banner";
import ServicesCard from "../ServicesCard/ServicesCard";
import Works from "../Works/Works";
import SpecialDoctors from "../SpecialDoctors/SpecialDoctors";
import TestimonialsCard from "../TestimonialsCard/TestimonialsCard";
import Appointment from "../../Appointment/Appointment";


const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <AboutCard></AboutCard>
            <ServicesCard></ServicesCard>
            <SpecialDoctors></SpecialDoctors>
            <TestimonialsCard></TestimonialsCard>
            <Works></Works>
            <Appointment></Appointment>
        </div>
    );
};

export default Home;