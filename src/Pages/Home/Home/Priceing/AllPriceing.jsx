import React from 'react';

const AllPriceing = ({ price }) => {
    console.log(price);
    const {
        serviceName,
        // serviceImage,
        description,
        features,
        buttonText
    } = price;
    return (
        <div>
            <div className="flex flex-col max-w-sm mx-4 my-6 shadow-lg">
                <div className="px-2 py-12 p-8 space-y-6 rounded shadow sm:p-8">
                    <div className="space-y-2">
                        <img src={"serviceImage"} alt="" />
                        <span className="text-3xl font-semibold">{serviceName}</span>
                    </div>
                    <p className="mt-3 leading-relaxed">{description}</p>
                    <ul className="flex-1 mb-6">
                        <li className="flex mb-2 space-x-2">
                            {/* Features */}
                            <div className="space-y-2">
                                {features.map((feature, index) => (
                                    <div
                                        key={index}
                                        className="flex justify-between md:gap-10"
                                    >
                                         <div className='flex gap-2'>
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-6 h-6">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                                        </svg>
                                        <span>
                                            {feature.name}
                                        </span>
                                         </div>

                                        <span>
                                            ${feature.price}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </li>
                    </ul>
                    <button type="button" className="inline-block px-5 py-3 font-semibold tracking-wider text-center rounded">{buttonText}</button>
                </div>
            </div>
        </div>
    );
};

export default AllPriceing;