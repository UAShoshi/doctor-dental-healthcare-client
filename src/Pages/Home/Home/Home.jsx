import AboutCard from "../AboutCard/AboutCard";
import Banner from "../Banner/Banner";
import ServicesCard from "../ServicesCard/ServicesCard";
import Works from "../Works/Works";
import Speciality from "./Speciality/Speciality";


const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <AboutCard></AboutCard>
            <ServicesCard></ServicesCard>
            <Speciality></Speciality>
            <Works></Works>
        </div>
    );
};

export default Home;