import { Link } from "react-router-dom";
import aboutCard from "../../../assets/about/about-card.jpg";


const AboutCard = () => {
    return (
        <div className="hero bg-base-200 min-h-screen">
  <div className="hero-content flex-col gap-10 lg:flex-row-reverse">
    <img
      src={aboutCard}
      className="md:max-w-lg rounded-lg shadow-2xl"
    />
    <div className="space-y-6">
        <div className="badge badge-soft bg-[#cfe2ff] uppercase">about our clinic</div>
      <h1 className="text-4xl font-semibold">A Caring Approach to <br /> Children’s Dental Health</h1>
      <p className="py-6">
        At our Pediatric Dentistry & Orthodontics Clinic, we believe every child <br />deserves a 
        positive, stress-free dental experience. Our team combines advanced <br />dental care with a 
        compassionate, family-centered approach – helping children <br />feel safe, supported, and proud of their smiles.
      </p>
      <button><Link to="/about" className="btn bg-[#5F6FFF] text-white rounded-xl px-10 uppercase py-6 hover:bg-[#434fbe]">Learn More About Us</Link></button>
    </div>
  </div>
</div>
    );
};

export default AboutCard;