import React from 'react';
import { CgAlarm, CgCalendar } from 'react-icons/cg';
import { GoArrowDownRight } from 'react-icons/go';
import { Link } from 'react-router-dom';

const AllBlogs = ({ blog }) => {
  const { _id, blogImage, blogTitle, category, author, authorImg, date, readTime, shortDescription } = blog;
  return (
    <div>
      <div className="card bg-base-100 mt-20 shadow-sm">
        <figure>
          <img
            src={blogImage}
            alt="" />
        </figure>
        <div className="card-body p-6 space-y-2">
          <div className="badge badge-soft bg-[#cfe2ff] uppercase">{category}</div>
          <h2 className="card-title">{blogTitle}</h2>
          <p>{shortDescription}</p>
          <div className='flex justify-baseline items-center'>
            <img src={authorImg} alt=""  className='w-8 mr-3'/>
            <p className='font-semibold'>{author}</p>
          </div>
          <div className='flex justify-between'>
              <p className='flex justify-baseline'><CgCalendar className='mr-3 mt-0.5 text-lg'></CgCalendar>{date}</p>
              <p className='flex justify-baseline'><CgAlarm className='mr-3 mt-0.5 text-lg'></CgAlarm>{readTime}</p>
          </div>
          <div className="card-actions mt-5 justify-end">
            <button><Link to={`/blogsdetails/${_id}`} className="uppercase flex justify-baseline font-medium hover:animate-bounce">Read More<GoArrowDownRight className="text-xl"></GoArrowDownRight></Link></button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllBlogs;