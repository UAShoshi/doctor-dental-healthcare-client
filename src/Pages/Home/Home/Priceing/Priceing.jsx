import React, { useEffect, useState } from 'react';
import Cover from '../../../../Shared/Cover/Cover';
import PriceingCover from '../../../../assets/author/Priceing-cover.jpg';
import AllPriceing from './AllPriceing';

const Priceing = () => {
    const [priceing, setPriceing] = useState([]);

    useEffect(() => {
        fetch('priceing.json')
        .then(res => res.json())
        .then(data => setPriceing(data));
    }, [])

    return (
        <div>
            <div>
                <Cover img={PriceingCover} title="PRICEING PLAN" testimonials="Priceing"></Cover>
            </div>
            <section className="py-20 ">
                <div className="container px-4 mx-auto">
                    <div className="max-w-2xl mx-auto mb-16 text-center">
                        <h2 className="text-4xl font-bold lg:text-5xl mb-4">Price Guide</h2>
                        <span className="">We treat every patient as an individual and create treatment plans to fit your specific needs.</span>
                    </div>
                    <div className="container grid lg:grid-cols-3 md:grid-cols-2 mx-auto gap-4 lg:px-10">
                           {priceing.map(price => (
                    <AllPriceing
                        key={price._id}
                        price={price}
                    />
                ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Priceing;