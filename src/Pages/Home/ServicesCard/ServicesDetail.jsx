import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { TiArrowRight } from "react-icons/ti";


const ServicesDetail = () => {

  const { id } = useParams();


  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/services.json")
      .then(res => res.json())
      .then(data => {
        setServices(data);
        setLoading(false);
      })
      .catch(error => {
        console.error(error);
        setLoading(false);
      });
  }, []);

  // Find specific service
  const service = services.find(
    item => item._id.toString() === id
  );

  // Loading
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  // Service not found
  if (!service) {
    return (
      <div className="text-center py-20">
        <h2 className="text-3xl font-bold">
          Service Not Found
        </h2>

        <Link to="/services">
          <button className="btn btn-primary mt-5">
            Back to Services
          </button>
        </Link>
      </div>
    );
  }




  return (
    <div>
      <div className='flex'>
        {/* -------- First Section --------- */}
        <div className="pt-30 px-4 py-12 mx-auto">

          {/* Service Name */}
          <div className="mb-16">

            <h1 className="text-5xl font-semibold">
              About {service.serviceName}
            </h1>
          </div>

          {/* Service Image */}
          <div className="mb-8">
            <img
              src={service.serviceImage}
              alt={service.serviceName}
              className="w-full rounded-2xl"
            />
          </div>

          {/* Service Information */}
          <div className="space-y-5">

            <h1 className="text-4xl font-semibold">
              About {service.serviceName}
            </h1>

            <p className="leading-8 text-gray-700">
              {service.serviceParagraph}
            </p>

          </div>

          {/* Questions & Answers */}
          <div className="mt-12">

            <h2 className="text-3xl font-bold mb-6">
              Frequently Asked Questions
            </h2>

            <div className="space-y-4">

              {service.questionsAnswers?.map(
                (item, index) => (
                  <details
                    key={index}
                    className="shadow-2xs border border-base-300 rounded-xl collapse bg-base-100" name="my-accordion-det-1" open
                  >

                    <summary className="collapse-title text-xl font-semibold">
                      {item.question}
                    </summary>

                    <p className="collapse-content mt-2 text-gray-600">
                      {item.answer}
                    </p>

                  </details>


                )
              )}

            </div>
          </div>

        </div>
        {/* -------- Last Section -------- */}
        <div className='pt-30 px-4 py-12 mx-auto'>
          <div>
            <h1 className="p-4 text-center text-xl tracking-wide font-semibold pb-6">Our Services</h1>
            <ul className="list bg-base-100 rounded-box shadow-md border border-base-300">


              {service.serviceList?.map((item, index) => {

                const relatedService = services.find(
                  serviceItem => serviceItem.serviceName === item
                );

                return (
                  <li className='list-row"' key={index}>
                    {relatedService ? (
                      <Link to={`/servicesdetail/${relatedService._id}`}>
                        <div className="flex justify-between p-4 hover:shadow-lg cursor-pointer overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
                          <span className="font-medium">
                            {item}
                          </span>

                          <span className="font-bold mr-2">
                            <TiArrowRight className='text-2xl'></TiArrowRight>
                          </span>
                        </div>
                      </Link>
                    ) : (
                      <div className="border rounded-lg p-4">
                        <span>{item}</span>
                      </div>

                    )}
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="text-center mt-20">
            <h1 className="font-semibold text-2xl pb-5">Book a Consultation:</h1>
          </div>

          <form noValidate="" className="space-y-6">
            <div>
              <label htmlFor="name" className="text-sm font-bold"></label>
              <input id="name" type="text" placeholder="Your Full Name*" className="input w-full p-3 py-8 rounded dark:bg-gray-100" />
            </div>
            <div>
              <label htmlFor="phone" className="text-sm font-bold"></label>
              <input type="phone" placeholder="Your Phone" className="input w-full p-3 py-8 rounded dark:bg-gray-100" />
            </div>
            <div>
              <label htmlFor="message" className="text-sm font-bold"></label>
              <input type="date" placeholder="Select Date" className="input w-full p-3 py-8 rounded dark:bg-gray-100" />
            </div>
            <div className='flex gap-3'>
              <select defaultValue="Pick a color" className="select">
                {/* <option disabled={true}>08</option> */}
                <option>08</option>
                <option>09</option>
                <option>11</option>
                <option>12</option>
                <option>13</option>
                <option>14</option>
                <option>15</option>
                <option>16</option>
                <option>17</option>
                <option>18</option>
                <option>19</option>
              </select>
              <select defaultValue="Pick a color" className="select">
                {/* <option disabled={true}>30</option> */}
                <option>00</option>
                <option>10</option>
                <option>20</option>
                <option>30</option>
                <option>40</option>
                <option>50</option>
              </select>
            </div>
            <button type="submit" className="w-full p-3 text-sm font-bold tracking-wide uppercase rounded btn bg-[#5F6FFF] text-white hover:bg-[#434fbe]">book online</button>
          </form>
        </div>

      </div>

      {/* Back Button */}
      <div className="mt-10">
        <Link to="/services">
          <button className="btn btn-outline mb-20">
            ← Back to Services
          </button>
        </Link>
      </div>

    </div>
  );
};

export default ServicesDetail;