import { Link } from "react-router-dom";


const Cover = ({ img, title, directions, about, contact, testimonials }) => {
  return (
    <div
      className="hero h-[600px]"
      style={{
        backgroundImage:
          `url("${img}")`,
      }}
    >
      <div className="hero-overlay"></div>
      <div className="hero-content text-neutral-content text-center">
        <div className="max-w-md">
          <h1 className="text-4xl font-apparcase pt-32 text-center font-bold">{title}</h1>
          <div className="breadcrumbs text-sm pl-7">
            <ul>
              <li><a><Link to={"/"}>Home</Link></a></li>
              {
                directions ? (
                  <li>
                    <Link to="/services">Services</Link>
                  </li>
                ) : about ? (
                  <li>
                    <Link to="/contact">Contact Us</Link>
                  </li>
                ) : contact ? (
                  <li>
                    <Link to="/about">About Us</Link>
                  </li>
                ) : testimonials ? ( <li>
                    <Link to="/priceing">Priceing</Link>
                  </li>
                ) :  <li>
                    <Link to="/testimonials">Testimonials</Link>
                  </li>
              }
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cover;