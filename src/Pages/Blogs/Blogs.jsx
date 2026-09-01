import { useEffect, useState } from 'react';
import Cover from '../../Shared/Cover/Cover';
import AllBlogs from './AllBlogs';
import BlogsCover from '../../assets/blog/cover-img.jpg';

const Blogs = () => {

    const [blogs, setBlogs] = useState([]);
    
        useEffect(() => {
            fetch('blogs.json')
                .then(res => res.json())
                .then(data => setBlogs(data));
        }, [])


    return (
        <div>
            <div>
                <Cover img={BlogsCover} title="OUR BLOGS" blogs="Our Blogs"></Cover>
            </div>
            <div className='text-center mt-20'>
                <h2 className='text-3xl font-bold py-5'>Our Dental Care Blogs</h2>
                <p>Explore our dental care blog for helpful tips, expert advice, and the latest oral health information.</p>
            </div>
            <div className='grid lg:grid-cols-3 md:grid-cols-2 gap-5'>
                  {blogs.map(blog => (
                    <AllBlogs
                        key={blog._id}
                        blog={blog}
                    />
                ))}
            </div>
        </div>
    );
};

export default Blogs;